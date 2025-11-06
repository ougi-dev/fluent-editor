import {
  Bell,
  CircleX,
  GitBranch,
  Pin,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { StatusBarContainer } from "@/components/elements/status-bar-container";
import { StatusBarItem } from "@/components/ui/status-bar-component";

export default function StatusBar() {
  return (
    <StatusBarContainer>
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
    </StatusBarContainer>
  );
}
