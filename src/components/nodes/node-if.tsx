"use client";

import { Handle, Position } from "@xyflow/react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Node,
  NodeAction,
  NodeContent,
  NodeDescription,
  NodeFooter,
  NodeHeader,
  NodeTitle,
} from "@/components/ui/node";
import { useUpdateNodeData } from "@/hooks/use-update-node-data";

type IfNodeData = {
  condition: string;
};
function IfNode({
  id,
  data,
}: {
  id: string;
  data: IfNodeData;
  selected: boolean;
}) {
  const updateNode = useUpdateNodeData<IfNodeData>(id);

  return (
    <Node>
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
          placeholder="player.hp > 50"
          value={data.condition}
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
    </Node>
  );
}
export default IfNode;
