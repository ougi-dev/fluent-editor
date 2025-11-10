/** biome-ignore-all lint/suspicious/noConsole: <testing> */
import type { Edge, Node } from "@xyflow/react";
import type { Metadata } from "next";
import { cache } from "react";
import NodeCanvasContainer from "@/components/node-canvas-container";
import { getClientDb } from "@/db/client-db";

type EventParams = Promise<{ id: string }>;

type GraphRecord = {
  id: string;
  name?: string;
  nodes: Node[];
  edges: Edge[];
};

// Cached fetch function using type::thing for proper record matching
const getEvent = cache(
  async (params: EventParams): Promise<GraphRecord | null> => {
    const { id } = await params;
    console.log("[🧩] Fetching event with ID:", id);

    const db = await getClientDb();

    try {
      // Proper query using type::thing() for ID matching
      const result = await db.query<[GraphRecord[]]>(
        `SELECT * FROM graph WHERE id = type::thing('graph', $id);`,
        { id }
      );

      const [rows] = result;
      const event = rows?.[0] ?? null;

      console.log("[📦] Loaded graph record:", event);
      return event;
    } catch (err) {
      console.error("[❌] Failed to fetch graph:", err);
      return null;
    } finally {
      await db.close();
    }
  }
);

export async function generateMetadata({
  params,
}: {
  params: EventParams;
}): Promise<Metadata> {
  const event = await getEvent(params);
  return {
    title: event?.name ?? "Event Not Found",
    description: `Editing ${event?.name ?? "Event Not Found"}`,
  };
}

// ✅ Main Page (await params)
export default async function EventIDPage({ params }: { params: EventParams }) {
  const { id } = await params;
  const event = await getEvent(params);

  if (!event) {
    return (
      <div className="flex h-full items-center justify-center">
        Event not found
      </div>
    );
  }

  const nodes = event.nodes ?? [];
  const edges = event.edges ?? [];

  console.log(`✅ Loaded ${nodes.length} nodes and ${edges.length} edges`);

  return (
    <div className="h-full w-full">
      <NodeCanvasContainer edges={edges} graphId={id} nodes={nodes} />
    </div>
  );
}
