"use client";
import dayjs from "dayjs";
import { create } from "zustand";

export interface CalendarDate {
  calendarDate: string | Date;
  setCurrentCalendarDate: (calendarDate: string | Date) => void;
}

export const calendarDateStore = create<CalendarDate>((set) => ({
  calendarDate: dayjs().format("YYYY-MM-DD"),
  setCurrentCalendarDate: (calendarDate: string | Date) => set({ calendarDate }),
}));
