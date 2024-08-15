import type { IconTypes } from "solid-icons";
import type { JSX } from "solid-js";

export type Component<P = Record<string, never>> = (props: P) => JSX.Element;
export type TProtectedRoutePage = {
  title: string;
  url: string;
  isService: boolean;
  tooltip: string;
  icon: IconTypes;
};
