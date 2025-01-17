import { create } from "zustand";

export const attendanceStore = create<any>((set) => ({
  attendance: {
    checkInTime: null,
  },
  setCheckInTime: (attendance: any) => set({ attendance }),
}));
