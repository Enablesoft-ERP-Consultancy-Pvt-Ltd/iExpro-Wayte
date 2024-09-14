import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { allProtectedRoutePages } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function equalUrls(a: string, b: string) {
  return (
    new URL(a, "http://example.com").pathname ===
    new URL(b, "http://example.com").pathname
  );
}

export function getCurrentProtectedRouteFromUrl(url: string) {
  for (const route of Object.values(allProtectedRoutePages)) {
    if (equalUrls(route.url, url)) {
      return route;
    }
  }

  return allProtectedRoutePages["weight-service"];
}

export function isBrowser() {
  return window && !window.__TAURI_IPC__;
}

export function parseFloatFromRawWeight(weight: string) {
  if (weight.length <= 0) {
    return 0.0;
  }

  const result = /\d+\.?\d?/gm.exec(weight);
  return result ? Number(Number(result[0]).toFixed(3)) : 0.0;
}
