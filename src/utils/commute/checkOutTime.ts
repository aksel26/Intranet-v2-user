import dayjs from "dayjs";

export const checkOutTimeValidation = (
  targetTime: string | null | undefined
) => {
  if (!targetTime) return null;
  const now = dayjs();
  const targetDateToDayjs = dayjs(targetTime);
  return now.isBefore(targetDateToDayjs);
};
