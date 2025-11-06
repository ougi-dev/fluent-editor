// scripts/create-graph.ts
/** biome-ignore-all lint/suspicious/noConsole: <utility> */
import type { Edge, Node } from "@xyflow/react";
import { jsonify } from "surrealdb";
import { getDb } from "@/db/surreal";

async function createGraph(): Promise<void> {
  const db = await getDb();

  if (!db) {
    console.error("Database not initialized");
    return;
  }

  try {
    // Create a bunch of nodes including our custom IfNode (type: "if")
    const nodes: Node[] = [
      {
        id: "if-1",
        type: "if",
        position: { x: 120, y: 80 },
        data: { condition: "player.hp > 50" },
      },
      {
        id: "n2",
        type: "default",
        position: { x: 320, y: 60 },
        data: { label: "Dialog" },
      },
      {
        id: "n3",
        type: "default",
        position: { x: 520, y: 100 },
        data: { label: "Enemy" },
      },
      {
        id: "n4",
        type: "input",
        position: { x: 120, y: 240 },
        data: { label: "Start" },
      },
      {
        id: "n5",
        type: "default",
        position: { x: 320, y: 240 },
        data: { label: "Quest" },
      },
      {
        id: "n6",
        type: "default",
        position: { x: 520, y: 240 },
        data: { label: "Reward" },
      },
      {
        id: "n7",
        type: "default",
        position: { x: 720, y: 240 },
        data: { label: "End" },
      },
      {
        id: "n8",
        type: "default",
        position: { x: 720, y: 80 },
        data: { label: "Cutscene" },
      },
    ];

    // No edges as requested
    const edges: Edge[] = [];

    const graph = await db.create("graph", {
      name: "ev01",
      nodes,
      edges,
    });

    console.log("✅ Graph created:", jsonify(graph));
  } catch (err: unknown) {
    console.error("❌ Failed to create graph:", err);
  } finally {
    await db.close();
  }
}

createGraph();
