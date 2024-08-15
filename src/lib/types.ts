import type { IconTypes } from "solid-icons";
import type { JSX } from "solid-js";

export type Component<P = Record<string, never>> = (props: P) => JSX.Element;
export type TNavBarOption = {
  title: string;
  url: string;
  tooltip: string;
  icon: IconTypes;
};
