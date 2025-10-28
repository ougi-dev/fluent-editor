import { BatteryIcon, CircleAlert, GitBranch, Pin } from "lucide-react";
import { AppBar } from "@/components/app-bar";
import { StatusBarItem } from "@/components/elements/status-bar-component";
import { StatusBar } from "@/components/status-bar";

export default function Home() {
  return (
    <div>
      <AppBar />
      <StatusBar>
        <StatusBarItem lucideIcon={Pin} side="left">
          Map: Overworld
        </StatusBarItem>
        <StatusBarItem lucideIcon={GitBranch} side="left">
          Main Branch
        </StatusBarItem>
        <StatusBarItem lucideIcon={CircleAlert} side="left" />
        <StatusBarItem side="right">Zoom: 100%</StatusBarItem>
        <StatusBarItem lucideIcon={BatteryIcon} side="right">
          85%
        </StatusBarItem>
      </StatusBar>
    </div>
  );
}
