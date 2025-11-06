import type { Edge, Node } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import type { Uuid } from "surrealdb";
import { getClientDb } from "@/db/client-db";

type GraphRecord = {
  id: string;
  name?: string;
  nodes: Node[];
  edges: Edge[];
};

const RECONNECT_DELAY_MS = 3000;

function normalizeId(id: unknown): string | null {
  if (typeof id === "string") {
    return id;
  }
  try {
    const s = String(id);
    return s && s !== "[object Object]" ? s : null;
  } catch {
    return null;
  }
}

function isUpdateActionType(action: unknown): boolean {
  const a = String(action).toUpperCase();
  return a === "UPDATE" || a === "CREATE";
}

function handleGraphLive(
  action: unknown,
  result: unknown,
  graphId: string,
  onUpdate: (graph: GraphRecord) => void
): void {
  if (typeof result === "string") {
    return;
  }
  const resultId = normalizeId((result as { id?: unknown }).id);
  if (!resultId) {
    return;
  }
  const isTargetGraph = resultId === `graph:${graphId}` || resultId === graphId;
  if (!isTargetGraph) {
    return;
  }
  if (!isUpdateActionType(action)) {
    return;
  }
  onUpdate(result as GraphRecord);
}

/**
 * Hook to listen for real-time updates from SurrealDB
 *
 * @param graphId - The ID of the graph to watch (e.g., "my-graph")
 * @param onUpdate - Callback when the graph is updated by anyone
 */
export function useLiveQuery(
  graphId: string,
  onUpdate: (graph: GraphRecord) => void
) {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const liveQueryIdRef = useRef<Uuid | null>(null);

  useEffect(() => {
    let mounted = true;
    // Start listening for live updates
    const startLiveQuery = async () => {
      try {
        const db = await getClientDb();

        if (!mounted) {
          return;
        }

        setIsConnected(true);
        setError(null);
        const queryId = await db.live<GraphRecord>(
          "graph",
          (action, result) => {
            if (!mounted) {
              return;
            }
            handleGraphLive(action, result, graphId, onUpdate);
          }
        );

        // Store the query ID so we can cancel it on unmount
        liveQueryIdRef.current = queryId;
      } catch (err) {
        if (mounted) {
          setError(err as Error);

          // Try to reconnect after delay
          setTimeout(() => {
            if (mounted) {
              startLiveQuery();
            }
          }, RECONNECT_DELAY_MS);
        }
      }
    };

    startLiveQuery();

    // Cleanup on unmount, otherwise it keeps running in the background (memory leak!)
    return () => {
      mounted = false;

      if (liveQueryIdRef.current) {
        getClientDb()
          .then((db) => {
            if (liveQueryIdRef.current) {
              db.kill(liveQueryIdRef.current);
            }
          })
          .catch(() => {
            // Ignore cleanup errors
          });
      }
    };
  }, [graphId, onUpdate]);

  return { isConnected, error };
}
