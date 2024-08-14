import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "~/lib/types";

const ProtectedRoutesLayout: Component<RouteSectionProps> = (props) => {
  return (
    <div>
      <p>LAYOUT</p>
      {props.children}
    </div>
  );
};

export default ProtectedRoutesLayout;
