"use client";
// import type { Node as NodeTypes } from "@xyflow/react";
import type * as React from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/* ------------------------------ Node Container ----------------------------- */
function Node({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid rounded-xl border bg-node text-foreground shadow-sm backdrop-blur-sm",
        className
      )} // makes the div focusable
      data-slot="node"
      // biome-ignore lint/a11y/noNoninteractiveTabindex: <this is a keyboard focusable node>
      tabIndex={0}
      {...props}
    />
  );
}

/* ------------------------------- Node Header ------------------------------ */
function NodeHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <header
      className={cn(
        "grid items-start gap-1 border-b px-3 pt-3 pb-2",
        "grid-cols-[1fr_auto]",
        className
      )}
      data-slot="node-header"
      {...props}
    />
  );
}

/* ------------------------------- Node Title ------------------------------- */
function NodeTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("font-semibold text-sm leading-none", className)}
      data-slot="node-title"
      {...props}
    />
  );
}

/* ---------------------------- Node Description ---------------------------- */
function NodeDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("text-muted-foreground text-xs", className)}
      data-slot="node-description"
      {...props}
    />
  );
}

/* ------------------------------- Node Action ------------------------------ */
function NodeAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("self-start justify-self-end", className)}
      data-slot="node-action"
      {...props}
    />
  );
}

/* ------------------------------- Node Content ----------------------------- */
function NodeContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("nodrag flex flex-col gap-2 p-3", className)}
      data-slot="node-content"
      {...props}
    />
  );
}

/* ------------------------------- Node Footer ------------------------------ */
function NodeFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <footer
      className={cn(
        "flex items-center justify-between gap-2 border-t px-3 py-2",
        className
      )}
      data-slot="node-footer"
      {...props}
    />
  );
}

/* -------------------------- Node Separator (optional) --------------------- */
function NodeSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative my-2 h-5 w-full text-sm", className)}
      data-slot="node-separator"
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
    </div>
  );
}

export {
  Node,
  NodeHeader,
  NodeFooter,
  NodeTitle,
  NodeAction,
  NodeDescription,
  NodeContent,
  NodeSeparator,
};
