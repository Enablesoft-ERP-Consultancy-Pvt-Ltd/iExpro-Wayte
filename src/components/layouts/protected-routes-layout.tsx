import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "~/lib/types";
import Navbar from "~/components/composables/navbar/navbar";

const ProtectedRoutesLayout: Component<RouteSectionProps> = (props) => {
  return (
    <div class="flex">
      <Navbar />
      {props.children}
    </div>
  );
};

export default ProtectedRoutesLayout;
