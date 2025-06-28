import dayjs from "dayjs";

// 2024-02-01
export const formatYYYYMMDD = (date: string | null) => {
  return dayjs(date).format("YYYY-MM-DD");
};

// HH-mm-ss 24시간 형식
export const formatTime = (date: string | null) => {
  if (!date) return "시간 정보가 없습니다.";
  return dayjs(date).format("HH:mm:ss");
};

export const formatTimeFull = (date: string | null) => {
  if (!date) return "시간 정보가 없습니다.";
  return dayjs(date).format("YYYY-MM-DD(dd) HH:mm:ss");
};

export const calculateNumberToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);

  if (hours === 0 && remainingMinutes === 0) {
    return "0분";
  }
  if (hours === 0) {
    return `${remainingMinutes}분`;
  } else {
    return `${hours}시간 ${remainingMinutes}분`;
  }
};
