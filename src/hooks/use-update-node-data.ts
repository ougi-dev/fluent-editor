import { type Node, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * Generic hook to patch any node's data in React Flow.
 *
 * - Works with *any* custom Node type
 * - Fully type-safe (no `any`)
 * - Efficient: wrapped in `useCallback`
 *
 * @example
 * const updateNode = useUpdateNodeData<Node<{ condition: string }, "if">>("if-1");
 * updateNode({ condition: "player.hp > 50" });
 */

export function useUpdateNodeData<N extends Node = Node>(id: N["id"]) {
  const { setNodes } = useReactFlow();
  return useCallback(
    (patch: Partial<N["data"]>) => {
      setNodes((nodes) =>
        nodes.map((node) =>
          node.id === id ? { ...node, data: { ...node.data, ...patch } } : node
        )
      );
    },
    [id, setNodes]
  );
}
