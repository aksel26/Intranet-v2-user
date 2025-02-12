import { create } from "zustand";

export const attendanceStore = create<any>((set) => ({
  myInfo: null,
  setCheckInTime: (myInfo: any) => set({ myInfo }),
}));
