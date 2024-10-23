import { create } from "zustand";
// import { TMealInfo } from "../types/meal";

export interface currentDateStore {
  currentDate: Date;
  setCurrentDate: (currentDate: Date) => void;
}

export const currentDateStore = create<currentDateStore>((set) => ({
  currentDate: new Date(),

  setCurrentDate: (currentDate: Date) => set({ currentDate }),
}));
