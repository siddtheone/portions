import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORE_SETTINGS_KEY } from "../constants";
import { SettingsStore } from "@/types";

export const useSettings = create<SettingsStore>()(
  persist(
    (set, get) => ({
      settings: {
        noticeShowed: false,
      },
      updateSettings(settings) {
        set({
          settings: {
            ...get().settings,
            ...settings,
          },
        });
      },
    }),
    {
      name: LOCAL_STORE_SETTINGS_KEY,
    }
  )
);
