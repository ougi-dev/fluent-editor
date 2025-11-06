import type { Edge } from "@xyflow/react";
import { useCallback, useRef } from "react";
import { getClientDb } from "@/db/client-db";

// Debounced edges sync to SurrealDB with conflict retries.
export function useEdgeSync(
  graphId: string,
  debounceMs = 250,
  getEdges?: () => Edge[]
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const patchEdges = useCallback(async () => {
    const localEdges = getEdges?.() ?? [];
    const nextEdges: Edge[] = localEdges.map((e) => ({
      ...e,
      id: String(e.id),
      source: String(e.source),
      target: String(e.target),
    }));

    const MAX_RETRIES = 3;
    const BASE_DELAY_MS = 100;
    let attempt = 0;
    while (attempt < MAX_RETRIES) {
      try {
        const db = await getClientDb();
        await db.query(
          "UPDATE type::thing('graph', $graphId) SET edges = $edges",
          {
            graphId,
            edges: nextEdges,
          }
        );
        return; // success
      } catch (error) {
        const message = (error as Error).message?.toLowerCase?.() ?? "";
        const isConflict = message.includes("conflict");
        if (!isConflict) {
          throw error;
        }
        const delay = BASE_DELAY_MS * 2 ** attempt;
        await new Promise((res) => setTimeout(res, delay));
        attempt += 1;
      }
    }
    throw new Error("Failed to patch edges after retries due to conflicts");
  }, [getEdges, graphId]);

  const scheduleSync = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      // Fire and forget; errors will be retried inside patchEdges
      patchEdges().catch(() => {
        // intentionally ignored
      });
    }, debounceMs);
  }, [debounceMs, patchEdges]);

  const cleanup = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return { scheduleSync, patchEdges, cleanup };
}
