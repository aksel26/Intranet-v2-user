import dayjs from "dayjs";

export const isDateBeforeToday = (date: string) => {
  const today = dayjs().startOf("day");
  const targetDate = dayjs(date).startOf("day");

  // 비교 수행: targetDate가 today보다 이전이면 true, 아니면 false
  return targetDate.isBefore(today);
};
