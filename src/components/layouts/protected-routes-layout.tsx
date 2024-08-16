import { useLocation, type RouteSectionProps } from "@solidjs/router";
import type { Component } from "~/lib/types";
import Navbar from "~/components/composables/navbar/navbar";
import { getCurrentProtectedRouteFromUrl } from "~/lib/utils";

const ProtectedRoutesLayout: Component<RouteSectionProps> = (props) => {
  const location = useLocation();
  const currentRoute = () => getCurrentProtectedRouteFromUrl(location.pathname);

  return (
    <div class="flex relative">
      <aside class="sticky top-0 border max-h-screen">
        <Navbar />
      </aside>
      <main class="w-full">
        <div class="sticky top-0 bg-background w-full border p-4">
          <h1 class="text-xl font-semibold">{currentRoute().title}</h1>
        </div>
        {props.children}
      </main>
    </div>
  );
};

export default ProtectedRoutesLayout;
