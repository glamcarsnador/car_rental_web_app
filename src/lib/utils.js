import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge Tailwind classes efficiently.
 * Combines clsx for conditional classes and tailwind-merge to handle conflicts.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}