"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

type TMeals = {
  year: number;
  month: number;
};
export const useGetMeals = ({ year, month }: TMeals) => {
  return useQuery({ queryKey: ["meals", { year, month }], queryFn: () => api.getMeals({ year, month }) });
};
