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
  org: {
    backend_base_url: string;
  };

  setValues: (values: Record<never, never>) => void;
}

const useAppSettingsStore = createWithSignal<AppSettingsStore>(
  // @ts-ignore: i know what i am doing.
  persist(
    (set) => ({
      appearance: {
        dark_theme: false,
      },
      weight_service_settings: {
        port: "COM1",
        baud_rate: 9600,
      },
      org: {
        backend_base_url: import.meta.env.VITE_BACKEND_BASE_URL,
      },
      setValues: (values) => {
        set((s) => ({ ...s, ...values }));
      },
    }),
    { name: "app_settings", storage: createJSONStorage(() => localStorage) }
  )
);

export default useAppSettingsStore;
