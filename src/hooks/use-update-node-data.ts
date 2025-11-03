import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

/**
 * A small utility hook for updating a node's data in React Flow.
 *
 * Example:
 * const updateNode = useUpdateNodeData(id);
 * updateNode({ text: "Hello" });
 */
export function useUpdateNodeData<T extends object = Record<string, unknown>>(
  id: string
) {
  const { setNodes } = useReactFlow();

  return useCallback(
    (newData: Partial<T>) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id ? { ...n, data: { ...n.data, ...newData } } : n
        )
      );
    },
    [id, setNodes]
  );
}
