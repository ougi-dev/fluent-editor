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
    const nodes: Node[] = [
      {
        id: "n1",
        position: { x: 0, y: 0 },
        data: { label: "Start Node" },
        type: "input",
      },
      {
        id: "n2",
        position: { x: 250, y: 0 },
        data: { label: "Next Node" },
        type: "default",
      },
    ];

    const edges: Edge[] = [
      {
        id: "e1",
        source: "n1",
        target: "n2",
        type: "smoothstep",
        animated: true,
      },
    ];

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
