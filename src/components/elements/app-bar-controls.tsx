"use client";
import { Maximize, Minus, X } from "lucide-react";
import { Button } from "../ui/button";

export function AppBarControls() {
  return (
    <div className="flex items-center justify-center">
      <Button className="flex h-8 w-[42]" title="Minimize" variant="ghost">
        <Minus className="h-5 w-5" />
      </Button>
      <Button className="flex h-8 w-[42]" title="Maximize" variant="ghost">
        <Maximize className="h-5 w-5" />
      </Button>
      <Button
        className="flex h-8 w-[42] items-center justify-center hover:bg-[#C42B1C]! active:bg-[#C42B1C]/90!"
        title="Close"
        variant="ghost"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
