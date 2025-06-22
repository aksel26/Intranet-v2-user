import dayjs from "dayjs";
import { create } from "zustand";

interface MainDate {
  dateValue: Date | null;
  innerValue: Date | undefined;
  setDateValue: (value: Date) => void;
  setInnerValue: (value: Date) => void;
}

export const mainDateStore = create<MainDate>((set) => ({
  dateValue: dayjs().toDate(),
  innerValue: dayjs().toDate(),
  setDateValue: (dateValue: Date | null) => set({ dateValue }),
  setInnerValue: (innerValue: Date | undefined) => set({ innerValue }),
}));
