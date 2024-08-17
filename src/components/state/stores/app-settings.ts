import { createWithSignal } from "solid-zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppSettingsStore {
  weight_service_settings: {
    port: string;
  };
  appearance: {
    dark_theme: boolean;
  };

  setValues: (values: Record<never, never>) => void;
}

const useAppSettingsStore = createWithSignal<AppSettingsStore>(
  // @ts-ignore
  persist(
    (set) => ({
      appearance: {
        dark_theme: false,
      },
      weight_service_settings: {
        port: "COM1",
      },
      setValues: (values) => {
        set((s) => ({ ...s, ...values }));
      },
    }),
    { name: "app_settings", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAppSettingsStore;
