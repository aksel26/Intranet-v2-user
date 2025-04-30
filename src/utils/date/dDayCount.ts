import dayjs from "dayjs";

export const getDDayCount = (baseDate: string | null) => {
  const today = dayjs();
  const target = dayjs(baseDate);
  const diff = today.diff(target, "day") + 1;

  return diff >= 0 ? `ACG Day + ${diff}` : `-`;
};
