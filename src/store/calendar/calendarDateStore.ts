import dayjs from "dayjs";
import { create } from "zustand";

export interface CalendarDate {
  calendarDate: string | Date | null;
  setCurrentCalendarDate: (calendarDate: string | Date) => void;
}

export const calendarDateStore = create<CalendarDate>((set) => ({
  calendarDate: dayjs().toDate(),
  setCurrentCalendarDate: (calendarDate: string | Date) => set({ calendarDate }),
}));
