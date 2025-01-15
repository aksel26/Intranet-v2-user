import dayjs from "dayjs";

// 2024-02-01
export const formatYYYYMMDD = (date: string | null) => {
return dayjs(date).format('YYYY-MM-DD')
};
