export default async function EventID({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>EVENT id: {id} </div>;
}
