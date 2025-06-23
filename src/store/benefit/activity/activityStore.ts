import type { TActivityInfo } from "@/types/activity";
import { create } from "zustand";
// import { TActivityInfo } from "../types/activity";

export interface activityStateStore {
  activityInfo: TActivityInfo;
  setActivityInfo: (activityInfo: TActivityInfo) => void;
}

export const activityStore = create<activityStateStore>((set) => ({
  activityInfo: {
    activityStats: {
      year: "",
      month: "",
      activityBudget: 0,
      activityExpense: 0,
      activityBalance: 0,
      userName: "",
    },

    activities: [],
  },
  setActivityInfo: (activityInfo: TActivityInfo) => set({ activityInfo }),
}));
