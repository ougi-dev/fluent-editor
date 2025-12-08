import type { ActivityProps } from "react";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "@/lib/utils/clsx";

/**
 * Merge conditional class names with tailwind-merge to avoid duplicates.
 * @param inputs variadic list of class values (string, array, object)
 * @returns a single merged class string
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(...inputs));

/**
 * Converts a boolean flag into a visibility for the React <Activity> component.
 * @param value when `true` returns "visible", otherwise "hidden"
 * @returns "visible" | "hidden"
 */
export const viewComponent = (value: boolean): ActivityProps["mode"] =>
  value ? "visible" : "hidden";
