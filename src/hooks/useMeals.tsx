import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/meal/mealApi";

type TMeals = {
  year: number;
  month: number;
};
export const useGetMeals = ({ year, month }: TMeals) => {
  return useQuery({ queryKey: ["meals", { year, month }], queryFn: () => api.getMeals({ year, month }) });
};
