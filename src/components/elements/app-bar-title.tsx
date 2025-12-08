import { metadata } from "@/app/layout";

export function AppBarTitle() {
  return (
    <div>
      <p className="select-none font-medium text-sm text-white">
        {metadata.title?.toString()}
      </p>
    </div>
  );
}
