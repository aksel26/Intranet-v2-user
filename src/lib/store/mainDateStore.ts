import { create } from "zustand";

export const mainDateStore = create<any>((set) => ({
  dateValue: new Date(),
  setDateValue: (dateValue: Date | null) => set({ dateValue }),
}));
