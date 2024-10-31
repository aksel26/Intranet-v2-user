import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

type TWelfares = {
  year: number;
  month: number;
};
export const useGetActivities = ({ year, month }: TWelfares) => {
  return useQuery({ queryKey: ["activity", { year, month }], queryFn: () => api.getActivities({ year, month }) });
};
