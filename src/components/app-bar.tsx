import { AppBarControls } from "@/components/elements/app-bar-controls";
import { AppBarMenu } from "@/components/elements/app-bar-menu";
import { AppBarTitle } from "@/components/elements/app-bar-title";

export default function AppBar() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 row-start-1 flex h-[38] items-center justify-between border-border border-b bg-background"
      id="app-bar"
    >
      <AppBarMenu />
      <AppBarTitle />
      <AppBarControls />
    </header>
  );
}
