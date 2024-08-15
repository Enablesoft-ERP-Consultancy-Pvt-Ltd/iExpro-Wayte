import { For } from "solid-js";
import type { TNavBarOption } from "~/lib/types";
import NavBarButton from "./navbar-button";
import { FaSolidWeightScale } from "solid-icons/fa";
import { IoSettingsSharp } from 'solid-icons/io'

const navbarOptions: TNavBarOption[] = [
  {
    title: "Weight service",
    tooltip: "Weight service",
    url: "/protected/weight-service",
    icon: FaSolidWeightScale,
  },
];

const Navbar = () => {
  return (
    <nav class="flex flex-col h-screen max-h-screen border py-4 bg-background">
      <ul class="flex flex-col gap-2 flex-grow overflow-auto">
        <For each={navbarOptions} fallback={<div>Loading...</div>}>
          {(option) => <NavBarButton option={option} />}
        </For>
      </ul>

      <NavBarButton option={{ title: "Settings", tooltip: "App settings", url: "/protected/settings", icon: IoSettingsSharp }} />
    </nav>
  );
};

export default Navbar;
