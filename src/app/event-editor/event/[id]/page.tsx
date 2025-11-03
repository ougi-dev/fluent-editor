import type { Edge, Node } from "@xyflow/react";
import { eq } from "drizzle-orm";
import { cache } from "react";
import NodeCanvasContainer from "@/components/node-canvas-container";
import db from "@/db/client";
import { events } from "@/db/schema";

type EventParams = Promise<{ id: string }>;

const getEvent = cache(async (params: EventParams) => {
  const { id } = await params;
  return db.query.events.findFirst({
    where: eq(events.id, id),
  });
});

export async function generateMetadata({ params }: { params: EventParams }) {
  const event = await getEvent(params);
  return {
    title: event?.name ?? "Event Not Found",
  };
}

export default async function EventIDPage({ params }: { params: EventParams }) {
  const event = await getEvent(params);

  if (!event) {
    return <div>Event not found</div>;
  }
  const nodes: Node[] = event.nodes ? JSON.parse(event.nodes) : [];
  const edges: Edge[] = event.edges ? JSON.parse(event.edges) : [];

  // biome-ignore lint/suspicious/noConsole: <testing>
  console.table(nodes[2].data);

  return (
    <div className="h-full w-full">
      <NodeCanvasContainer edges={edges} nodes={nodes} />
    </div>
  );
}
