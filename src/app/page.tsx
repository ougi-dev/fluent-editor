import {
  Bell,
  CircleX,
  GitBranch,
  Pin,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { AppBar } from "@/components/app-bar";
import { StatusBarItem } from "@/components/elements/status-bar-component";
import { StatusBar } from "@/components/status-bar";

export default function Home() {
  return (
    <div>
      <AppBar />
      <StatusBar>
        <StatusBarItem lucideIcon={GitBranch} side="left">
          Main Branch
        </StatusBarItem>
        <StatusBarItem lucideIcon={Pin} side="left">
          Map: Overworld
        </StatusBarItem>
        <StatusBarItem side="left">X: {8}</StatusBarItem>
        <StatusBarItem side="left">Y: {43}</StatusBarItem>
        <StatusBarItem side="right">Zoom: 100%</StatusBarItem>
        <StatusBarItem lucideIcon={Sparkles} side="right" />
        <StatusBarItem lucideIcon={TriangleAlert} side="right">
          0
        </StatusBarItem>
        <StatusBarItem lucideIcon={CircleX} side="right">
          0
        </StatusBarItem>
        <StatusBarItem lucideIcon={Bell} side="right">
          0
        </StatusBarItem>
      </StatusBar>
    </div>
  );
}
