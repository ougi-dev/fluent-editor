// import { cva } from "class-variance-authority";
import React, { type PropsWithChildren, type ReactElement } from "react";
import {
  StatusBarItem,
  type StatusBarItemProps,
} from "@/components/elements/status-bar-component";

// const StatusBarVariants = cva(); TODO: add variants

export function StatusBar({ children }: PropsWithChildren) {
  const items = {
    left: [] as ReactElement<StatusBarItemProps>[],
    right: [] as ReactElement<StatusBarItemProps>[],
  };
  for (const child of React.Children.toArray(children)) {
    if (React.isValidElement(child) && child.type === StatusBarItem) {
      const element = child as ReactElement<StatusBarItemProps>;
      items[element.props.side === "right" ? "right" : "left"].push(element);
    }
  }

  return (
    <footer className="fixed right-0 bottom-0 left-0 z-0 h-6 border-primary border-t bg-primary">
      <div className="grid h-full grid-cols-2 items-center">
        <div className="flex h-full items-center justify-start">
          {items.left}
        </div>
        <div className="flex h-full items-center justify-end">
          {items.right}
        </div>
      </div>
    </footer>
  );
}
