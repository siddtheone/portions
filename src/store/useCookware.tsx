import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORE_KEY } from "../constants";
import { CookwareStore } from "@/types";

export const useCookware = create<CookwareStore>()(
  persist(
    (set, get) => ({
      cookwares: [],
      updateCookware(id, update) {
        set({
          cookwares: get().cookwares.map((cookware) =>
            cookware.id === id ? { ...cookware, ...update } : cookware
          ),
        });
      },
      addNewCookware({ name, weight }) {
        set({
          cookwares: [
            {
              id: crypto.randomUUID(),
              name,
              weight,
              weightWithMeal: 0,
              servingCount: 1,
            },
            ...get().cookwares,
          ],
        });
      },
      deleteCookware(cookwareId) {
        set({
          cookwares: get().cookwares.filter(({ id }) => id !== cookwareId),
        });
      },
    }),
    {
      name: LOCAL_STORE_KEY,
    }
  )
);
