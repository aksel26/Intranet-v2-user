import { create } from "zustand";
import { TMealInfo } from "../types/meal";
import dayjs from "dayjs";
const nowMonthYear = dayjs();

export interface mealStateStore {
  // mealInfo: TMealInfo;
  mealInfo: any;
  setMealInfo: (mealInfo: TMealInfo) => void;
}

export const mealStore = create<mealStateStore>((set) => ({
  mealInfo: null,
  setMealInfo: (mealInfo: TMealInfo) => set({ mealInfo }),
}));

export interface mealCalendarStore {
  // mealInfo: TMealInfo;
  year: string;
  month: string;
  setMonth: (month: string) => void;
}

// Zustand 스토어 생성
export const useCalendarStore = create<mealCalendarStore>((set) => ({
  // 초기 상태
  year: nowMonthYear.year().toString(),
  month: (nowMonthYear.month() + 1).toString(), // dayjs는 월이 0부터 시작하므로 +1

  // 월 변경 액션
  setMonth: (month: string) => set({ month }),
}));
