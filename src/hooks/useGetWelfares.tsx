import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

type TWelfares = {
  year: number;
  month: number;
};
export const useGetWelfares = ({ year, month }: TWelfares) => {
  return useQuery({ queryKey: ["welfares", { year, month }], queryFn: () => api.getWelfares({ year, month }) });
};
