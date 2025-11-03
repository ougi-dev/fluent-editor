import { BackgroundVariant, type ColorMode } from "@xyflow/react";

export type EditorSettings = {
  theme: ColorMode;
  autosaveInterval: number;
  gridVisible: boolean;
  showMinimap: boolean;
  showControls: boolean;
  backgroundPattern: BackgroundVariant;
  language: string;
  experimentalFeatures: boolean;
};

export const editorSettings: EditorSettings = {
  theme: "dark",
  autosaveInterval: 5000,
  gridVisible: true,
  showMinimap: true,
  showControls: true,
  backgroundPattern: BackgroundVariant.Dots,
  language: "en",
  experimentalFeatures: false,
};
