import { FaSolidWeightScale } from "solid-icons/fa";
import type { TProtectedRoutePage } from "./types";
import { IoSettingsSharp } from "solid-icons/io";

export const allProtectedRoutePages: { [k: string]: TProtectedRoutePage } = {
  "weight-service": {
    title: "Weight service",
    tooltip: "Weight service",
    isService: true,
    url: "/protected/weight-service",
    icon: FaSolidWeightScale,
  },
  settings: {
    title: "Settings",
    tooltip: "App settings",
    isService: false,
    url: "/protected/settings",
    icon: IoSettingsSharp,
  },
};

export const servicesProtectedRoutes: TProtectedRoutePage[] = Object.values(
  allProtectedRoutePages
).filter((i) => i.isService);
