import dayjs from "dayjs";
const getNumbersString = (a: number, b: number): string => {
  const numbers = Array.from({ length: b - a + 1 }, (_, index) => a + index);
  return numbers.join(",");
};
export const compareMonth = (date: any) => {
  const [sDate, eDate] = date;

  const sDateMonth = dayjs(sDate).month() + 1;
  const eDateMonth = dayjs(eDate).month() + 1;

  if (sDateMonth === eDateMonth) return sDateMonth;
  else {
    const result = getNumbersString(sDateMonth, eDateMonth);
    return result;
  }
};
