import { For } from "solid-js";
import NavBarButton from "./navbar-button";
import {
  allProtectedRoutePages,
  servicesProtectedRoutes,
} from "~/lib/constants";

const Navbar = () => {
  return (
    <nav class="flex flex-col h-screen max-h-screen py-4 bg-background">
      <ul class="flex flex-col gap-2 flex-grow overflow-auto">
        <For each={servicesProtectedRoutes} fallback={<div>Loading...</div>}>
          {(option) => <NavBarButton option={option} />}
        </For>
      </ul>

      <NavBarButton option={allProtectedRoutePages.settings} />
    </nav>
  );
};

export default Navbar;
