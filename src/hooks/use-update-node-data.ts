import { type Node, useReactFlow } from "@xyflow/react";
import { createContext, useCallback, useContext } from "react";

/**
 * Context for syncing node data to database
 */
type NodeSyncContextType = {
  scheduleSync: (nodeId: string, changes: Partial<Node>) => void;
};

export const NodeSyncContext = createContext<NodeSyncContextType | null>(null);

/**
 * Generic hook to patch any node's data in React Flow.
 * Also syncs changes to the database if NodeSyncContext is provided.
 *
 * - Works with *any* custom Node type
 *
 * @example
 * const updateNode = useUpdateNodeData<CostumNode>(id);
 * updateNode({ condition: "player.hp > 50" });
 */

export function useUpdateNodeData<N extends Node = Node>(id: N["id"]) {
  const { setNodes } = useReactFlow();
  const syncContext = useContext(NodeSyncContext);

  return useCallback(
    (patch: Partial<N["data"]>) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === id) {
            const updatedNode = { ...node, data: { ...node.data, ...patch } };

            // Sync data changes to DB if context is available
            if (syncContext) {
              syncContext.scheduleSync(id, { data: updatedNode.data });
            }

            return updatedNode;
          }
          return node;
        })
      );
    },
    [id, setNodes, syncContext]
  );
}
