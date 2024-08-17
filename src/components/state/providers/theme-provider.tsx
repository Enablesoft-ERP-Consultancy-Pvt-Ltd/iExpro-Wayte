import { createEffect, type JSX, onMount, type Component } from "solid-js";
import useAppSettingsStore from "../stores/app-settings";

const ThemeProvider: Component<{ children: JSX.Element }> = ({ children }) => {
  const appSettings = useAppSettingsStore();

  onMount(() => {
    const root = document.documentElement;
    if (appSettings().appearance.dark_theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  });

  createEffect(() => {
    const root = document.documentElement;
    if (appSettings().appearance.dark_theme) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  });

  return <>{children}</>;
};
export default ThemeProvider;
