import { AppBarControls } from "@/components/elements/app-bar-controls";
import { AppBarMenu } from "@/components/elements/app-bar-menu";
import { AppBarTitle } from "@/components/elements/app-bar-title";

export function AppBar() {
  return (
    <header
      className="fixed top-0 right-0 left-0 z-50 border-border border-b bg-background"
      id="app-bar"
    >
      <div className="grid h-full grid-cols-3 items-center">
        <div className="justify-self-start">
          <AppBarMenu />
        </div>
        <div className="justify-self-center">
          <AppBarTitle />
        </div>
        <div className="justify-self-end">
          <AppBarControls />
        </div>
      </div>
    </header>
  );
}
