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
      <Handle className="bg-blue-500!" position={Position.Left} type="target" />
      <Handle
        className="!bg-green-500"
        id="true"
        position={Position.Right}
        style={{ top: "25%" }}
        type="source"
      />
      <Handle
        className="!bg-red-500"
        id="false"
        position={Position.Right}
        style={{ top: "75%" }}
        type="source"
      />
    </NodeContainer>
  );
}
export default IfNode;
