import dayjs from "dayjs";

type TDateRange = [string | null, string | null];

/**
 * 두 날짜 사이의 날짜 목록 중 주말(토, 일)을 제외한 날짜들을 YYYY-MM-DD 형식으로 반환합니다.
 *
 * @param {[Date, Date]} dates - [시작 날짜, 종료 날짜]
 * @param {string|number} attendance - 휴가 종류
 * @returns {string[]} YYYY-MM-DD 형식의 날짜 배열 (주말 제외)
 */

export const getWeekdaysBetweenDates = (
  dates: TDateRange,
  attendance: string | number
) => {
  const [startDate, endDate] = dates;
  // dayjs 객체로 변환
  let current = dayjs(startDate);
  const end = dayjs(endDate);
  const result = [];

  // 시작일부터 종료일까지 반복 (종료일 포함)
  while (current.isBefore(end) || current.isSame(end, "day")) {
    const dayOfWeek = current.day(); // 0: 일요일, 6: 토요일
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      result.push({
        commuteDate: current.format("YYYY-MM-DD"),
        leaveTypeIdx: attendance,
      });
    }
    current = current.add(1, "day");
  }

  return result;
};
