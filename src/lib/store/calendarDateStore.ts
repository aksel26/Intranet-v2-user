import dayjs from "dayjs";
import { create } from "zustand";

export interface CalendarDate {
  calendarDate: {
    start: string;
  };
  setCurrentCalendarDate: (newDate: string) => void;
}

export const calendarDateStore = create<CalendarDate>((set) => ({
  calendarDate: {
    start: dayjs().format("YYYY-MM-DD"),
  },
  setCurrentCalendarDate: (newDate: string) =>
    set((state) => ({
      calendarDate: { ...state.calendarDate, start: newDate },
    })),
}));
