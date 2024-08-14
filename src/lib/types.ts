import type { JSX } from "solid-js";

export declare type Component<P = Record<string, never>> = (
  props: P
) => JSX.Element;
