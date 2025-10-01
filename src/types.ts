export interface Cookware {
  id: string;
  name: string;
  weight: number;
  weightWithMeal: number;
  servingCount: number;
  expanded: boolean;
}

export type CookwareStore = {
  cookwares: Cookware[];
  updateCookware: (id: Cookware["id"], data: Partial<Cookware>) => void;
  addNewCookware: (data: Pick<Cookware, "name" | "weight">) => void;
  deleteCookware: (id: Cookware["id"]) => void;
};

export interface Settings {
  noticeShowed: boolean;
}

export interface SettingsStore {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
}
