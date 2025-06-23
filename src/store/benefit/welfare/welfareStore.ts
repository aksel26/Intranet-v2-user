import type { TWelfareInfo } from "@/types/welfare";
import { create } from "zustand";
// import { TWelfareInfo } from "../types/welfare";

export interface welfareStateStore {
  welfareInfo: TWelfareInfo;
  setwelfareInfo: (welfareInfo: TWelfareInfo) => void;
}

export const welfareStore = create<welfareStateStore>((set) => ({
  welfareInfo: {
    welfareStats: {
      year: "",
      month: "",
      welfareBudget: 0,
      welfareExpense: 0,
      welfareBalance: 0,
      userName: "",
    },

    welfares: [],
  },
  setwelfareInfo: (welfareInfo: TWelfareInfo) => set({ welfareInfo }),
}));
