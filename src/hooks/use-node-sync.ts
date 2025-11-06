import type { Node } from "@xyflow/react";
import { useCallback, useRef } from "react";
import { getClientDb } from "@/db/client-db";
/**
 * Hook to sync node changes to the database with debouncing
 *
 * @param graphId - The ID of the graph being edited (e.g., "my-graph")
 * @param debounceMs - How long to wait before syncing (default: 500ms)
 */
export function useNodeSync(
  graphId: string,
  debounceMs = 500,
  getNodes?: () => Node[]
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingChangesRef = useRef<Map<Node["id"], Partial<Node>>>(new Map());
  const patchNode = useCallback(
    async (changes: Partial<Node> & { id: Node["id"] }) => {
      // Build next nodes array from latest local state when available
      const localNodes = getNodes?.() ?? [];
      const nextNodes: Node[] = localNodes.map((n) =>
        n.id === changes.id
          ? {
              ...n,
              // merge data fields if provided
              data: changes.data ? { ...n.data, ...changes.data } : n.data,
              position: changes.position ?? n.position,
              // spread other allowed node props from changes (avoid replacing id)
              ...Object.fromEntries(
                Object.entries(changes).filter(
                  ([k]) => k !== "id" && k !== "data" && k !== "position"
                )
              ),
            }
          : n
      );
      const MAX_RETRIES = 3;
      const BASE_DELAY_MS = 100;
      let attempt = 0;

      while (attempt < MAX_RETRIES) {
        try {
          const db = await getClientDb();
          await db.query(
            "UPDATE type::thing('graph', $graphId) SET nodes = $nodes",
            {
              graphId,
              nodes: nextNodes,
            }
          );
          return; // success
        } catch (error) {
          const message = (error as Error).message?.toLowerCase?.() ?? "";
          const isConflict = message.includes("conflict");
          if (!isConflict) {
            throw error;
          }
          // Exponential backoff
          const delay = BASE_DELAY_MS * 2 ** attempt;
          await new Promise((res) => setTimeout(res, delay));
          attempt += 1;
        }
      }
      throw new Error("Failed to patch node after retries due to conflicts");
    },
    [getNodes, graphId]
  );
  const scheduleSync = useCallback(
    (nodeId: Node["id"], changes: Partial<Node>) => {
      // Merge changes for the same node
      // If user changes position then data, sync both together
      const key = nodeId;
      const existing =
        pendingChangesRef.current.get(key) ?? ({ id: key } as Partial<Node>);
      pendingChangesRef.current.set(key, { ...existing, ...changes, id: key });

      // Clear existing timeout (restart the countdown)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Schedule batch sync after debounce delay
      timeoutRef.current = setTimeout(() => {
        const changesArray = Array.from(
          pendingChangesRef.current.values()
        ) as Array<Partial<Node> & { id: Node["id"] }>;
        pendingChangesRef.current.clear();

        // Sync all pending changes to database
        for (const change of changesArray) {
          patchNode(change);
        }
      }, debounceMs);
    },
    [debounceMs, patchNode]
  );
  // Cleanup on unmount, prevents memory leaks by clearing pending timeouts
  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { scheduleSync, patchNode, cleanup };
}
