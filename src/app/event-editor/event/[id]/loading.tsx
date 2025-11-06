import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Spinner />
      <p>Loading... Nodes</p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
