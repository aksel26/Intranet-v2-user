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

export const calculateNumberToTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.floor(minutes % 60);
  const seconds = 0; // 초는 없으므로 0으로 설정

  return {
    hours,
    minutes: remainingMinutes,
    seconds,
  };
};

export const monthList = () => {
  return Array.from({ length: 12 }, (_, i) => i + 1);
};

export const yearsList = () => {
  const currentYear = new Date().getFullYear(); // 현재 연도
  const lastYear = currentYear; // 작년
  const years = [];

  for (let i = 4; i >= 0; i--) {
    years.push(lastYear - i);
  }

  return years;
};
