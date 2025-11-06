"use client";

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import { useCallback, useEffect, useRef, useState } from "react";
import "@xyflow/react/dist/style.css";

import type {
  Edge,
  Edge as FlowEdge,
  Node as FlowNode,
  Node,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "@xyflow/react";
import { nodeTypes } from "@/components/nodes/node-types";
import { useEdgeSync } from "@/hooks/use-edge-sync";
import { useLiveQuery } from "@/hooks/use-live-query";
import { useNodeSync } from "@/hooks/use-node-sync";
import { NodeSyncContext } from "@/hooks/use-update-node-data";
import { editorSettings } from "@/lib/utils/editor-settings";

type NodeCanvasContainerProps = {
  graphId: string;
  nodes: Node[];
  edges: Edge[];
};

// Defensive: normalize nodes so React Flow never receives invalid entries
function sanitizeNodes(input: unknown): Node[] {
  if (!Array.isArray(input)) {
    return [];
  }
  return (input as unknown[])
    .filter((n): n is Node => !!n && typeof n === "object")
    .filter((n) => typeof n.id === "number" || typeof n.id === "string")
    .map((n) => {
      const id = String(n.id as Node["id"]);
      const position = (n.position as Node["position"] | undefined) ?? {
        x: 0,
        y: 0,
      };
      const data = (n.data as Node["data"] | undefined) ?? {};
      const type = (n.type as Node["type"]) ?? undefined;
      return {
        ...(n as Node),
        id,
        position,
        data,
        type,
      } satisfies Node;
    });
}

function sanitizeEdges(input: unknown): Edge[] {
  if (!Array.isArray(input)) {
    return [];
  }
  return (input as unknown[])
    .filter((e): e is Edge => !!e && typeof e === "object")
    .filter(
      (e) =>
        (typeof e.id === "string" || typeof e.id === "number") &&
        typeof e.source === "string" &&
        typeof e.target === "string"
    )
    .map((e) => ({
      ...(e as Edge),
      id: String(e.id as Edge["id"]),
    }));
}

function NodeCanvasInner({
  graphId,
  nodes: initialNodes,
  edges: initialEdges,
}: NodeCanvasContainerProps) {
  const [nodes, setNodes] = useState<Node[]>(sanitizeNodes(initialNodes));
  const [edges, setEdges] = useState<Edge[]>(sanitizeEdges(initialEdges));

  // Keep a ref with the latest nodes for conflict-safe DB writes
  const nodesRef = useRef<Node[]>(nodes);
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  // Keep a ref with the latest edges for conflict-safe DB writes
  const edgesRef = useRef<Edge[]>(edges);
  useEffect(() => {
    edgesRef.current = edges;
  }, [edges]);

  const NODE_SYNC_DEBOUNCE_MS = 500;
  const EDGE_SYNC_DEBOUNCE_MS = 250;

  // Sync hook for patching changes to DB
  const { scheduleSync } = useNodeSync(
    graphId,
    NODE_SYNC_DEBOUNCE_MS,
    () => nodesRef.current
  );
  const { scheduleSync: scheduleEdgeSync } = useEdgeSync(
    graphId,
    EDGE_SYNC_DEBOUNCE_MS,
    () => edgesRef.current
  );

  // Listen for real-time updates from other users
  useLiveQuery(
    graphId,
    (updatedGraph: { nodes?: FlowNode[]; edges?: FlowEdge[] }) => {
      // Only update what we actually received and only if it's an array.
      if (Array.isArray(updatedGraph.nodes)) {
        setNodes(sanitizeNodes(updatedGraph.nodes));
      }
      if (Array.isArray(updatedGraph.edges)) {
        setEdges(sanitizeEdges(updatedGraph.edges));
      }
    }
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) => {
      setNodes((nds) => {
        const updatedNodes = applyNodeChanges(changes, nds);

        // Sync node changes to DB
        for (const change of changes) {
          if (change.type === "position" && change.dragging === false) {
            // Node position updated (drag ended)
            scheduleSync(change.id, { position: change.position });
          } else if (change.type === "dimensions") {
            // Node dimensions changed
            scheduleSync(change.id, {
              measured: change.dimensions,
            });
          }
        }
        return updatedNodes;
      });
    },
    [scheduleSync]
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((eds) => {
        const next = applyEdgeChanges(changes, eds);
        scheduleEdgeSync();
        return next;
      }),
    [scheduleEdgeSync]
  );
  const onConnect: OnConnect = useCallback(
    (params) =>
      setEdges((eds) => {
        const next = addEdge(params, eds);
        scheduleEdgeSync();
        return next;
      }),
    [scheduleEdgeSync]
  );

  return (
    <div className="h-full w-full">
      <NodeSyncContext.Provider value={{ scheduleSync }}>
        <ReactFlow
          colorMode={editorSettings.theme}
          edges={edges}
          edgesFocusable={false}
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
      </NodeSyncContext.Provider>
    </div>
  );
}

// Wrap in ReactFlowProvider for context
export default function NodeCanvasContainer(props: NodeCanvasContainerProps) {
  return (
    <ReactFlowProvider>
      <NodeCanvasInner {...props} />
    </ReactFlowProvider>
  );
}
