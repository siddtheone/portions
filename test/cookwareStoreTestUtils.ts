import { useCookware } from "@/store/useCookware";
import { CookwareStore } from "@/types";

const baseStore = useCookware.getState();

const baseFunctions = {
  addNewCookware: baseStore.addNewCookware,
  updateCookware: baseStore.updateCookware,
  deleteCookware: baseStore.deleteCookware,
};

export const buildCookwareState = (
  overrides: Partial<CookwareStore> = {},
): CookwareStore => ({
  cookwares: overrides.cookwares ?? [],
  addNewCookware: overrides.addNewCookware ?? baseFunctions.addNewCookware,
  updateCookware: overrides.updateCookware ?? baseFunctions.updateCookware,
  deleteCookware: overrides.deleteCookware ?? baseFunctions.deleteCookware,
});

export const resetCookwareStore = (overrides?: Partial<CookwareStore>) => {
  useCookware.setState(buildCookwareState(overrides), true);
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.clear();
  }
};

export const getCookwareState = () => useCookware.getState();

