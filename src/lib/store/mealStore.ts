import { create } from "zustand";
import { TMealInfo } from "../types/meal";

export interface mealStateStore {
  // mealInfo: TMealInfo;
  mealInfo: any;
  setMealInfo: (mealInfo: TMealInfo) => void;
}

export const mealStore = create<mealStateStore>((set) => ({
  mealInfo: null,
  setMealInfo: (mealInfo: TMealInfo) => set({ mealInfo }),
}));
