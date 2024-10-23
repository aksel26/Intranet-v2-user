import { create } from "zustand";
import { TMealInfo } from "../types/meal";

export interface mealStateStore {
  mealInfo: TMealInfo;
  setMealInfo: (mealInfo: TMealInfo) => void;
}

export const mealStore = create<mealStateStore>((set) => ({
  mealInfo: {
    mealStats: {
      year: "",
      month: "",
      mealBudget: 0,
      mealExpense: 0,
      mealBalance: 0,
      userName: "",
    },

    meals: [],
  },
  setMealInfo: (mealInfo: TMealInfo) => set({ mealInfo }),
}));
