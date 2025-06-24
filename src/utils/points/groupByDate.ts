import dayjs from "dayjs";

export const groupByDate = (data: any) => {
  if (!data) return [];
  const grouped = data?.reduce((acc: any, curr: any) => {
    const date = curr.targetDay;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  // 객체를 배열로 변환하고 날짜순 정렬
  return Object.entries(grouped)
    .map(([date, list]) => ({
      date,
      list,
    }))
    .sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf());
};
