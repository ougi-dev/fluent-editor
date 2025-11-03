"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";
import { useCallback, useState } from "react";
import "@xyflow/react/dist/style.css";

import type {
  Edge,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import { nodeTypes } from "@/components/nodes/node-types";
import { editorSettings } from "@/lib/utils/editor-settings";

type NodeCanvasContainerProps = {
  nodes: Node[];
  edges: Edge[];
};

export default function NodeCanvasContainer({
  nodes: initialNodes,
  edges: initialEdges,
}: NodeCanvasContainerProps) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <div className="absolute h-full w-full">
      <ReactFlow
        colorMode={editorSettings.theme}
        edges={edges}
        fitView
        nodes={nodes}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={editorSettings.backgroundPattern} />
        {editorSettings.showMinimap && <MiniMap />}
        {editorSettings.showControls && <Controls />}
      </ReactFlow>
    </div>
  );
}
