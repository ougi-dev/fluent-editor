import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "@/lib/utils/clsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
