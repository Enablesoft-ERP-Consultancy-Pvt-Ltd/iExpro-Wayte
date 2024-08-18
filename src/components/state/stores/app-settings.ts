import { createWithSignal } from "solid-zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AppSettingsStore {
  appearance: {
    dark_theme: boolean;
  };
  weight_service_settings: {
    port: string;
    baud_rate: number;
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
        baud_rate: 9600,
      },
      setValues: (values) => {
        set((s) => ({ ...s, ...values }));
      },
    }),
    { name: "app_settings", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAppSettingsStore;
