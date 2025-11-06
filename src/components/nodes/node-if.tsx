"use client";

import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  NodeAction,
  NodeContainer,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/components/ui/node";
import { useUpdateNodeData } from "@/hooks/use-update-node-data";

type IfNode = Node<{ condition: string }, "condition">;

function IfNode({ data, id }: NodeProps<IfNode>) {
  const updateNode = useUpdateNodeData<IfNode>(id);
  return (
    <NodeContainer>
      <NodeHeader>
        <NodeTitle>Conditional (If) </NodeTitle>
        <NodeAction>action</NodeAction>
        <NodeDescription>tgggg</NodeDescription>
      </NodeHeader>
      <NodeContent>
        <Label htmlFor={`if-${id}`}>Condition</Label>
        <Handle
          className="bg-blue-500"
          position={Position.Left}
          type="target"
        />
        <Input
          className="text-xs"
          id={`if-${id}`}
          onChange={(e) => updateNode({ condition: e.target.value })}
          placeholder="condition"
          value={data.condition ?? ""}
        />
      </NodeContent>
      <NodeFooter>footer</NodeFooter>
      {/* Connection handles */}
      <Handle
        position={Position.Left}
        style={{ background: "#0000ff" }}
        type="target"
      />
      <Handle
        id="true"
        position={Position.Right}
        style={{ top: "25%", background: "#00ff00" }}
        type="source"
      />
      <Handle
        id="false"
        position={Position.Right}
        style={{ top: "75%", background: "#ff0000" }}
        type="source"
      />
    </NodeContainer>
  );
}
export default IfNode;
