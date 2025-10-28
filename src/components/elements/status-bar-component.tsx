import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StatusBarItemProps = {
  side: "left" | "right";
  children?: ReactNode;
  className?: string;
  lucideIcon?: LucideIcon;
};

export function StatusBarItem({
  children,
  className,
  lucideIcon: IconComponent,
}: StatusBarItemProps) {
  return (
    <div
      className={cn(
        "flex h-full cursor-pointer select-none items-center px-2 text-xs hover:bg-muted/80",
        className
      )}
    >
      {IconComponent && (
        <IconComponent className={children ? "mr-1" : ""} size={16} />
      )}
      {children}
    </div>
  );
}
