import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function equalUrls(a: string, b: string) {
  return (
    new URL(a, "http://example.com").pathname ===
    new URL(b, "http://example.com").pathname
  );
}
