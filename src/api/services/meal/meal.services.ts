import type { TMealsParams } from "@/types/meal";
import { apiClient } from "../../client";

export const mealService = {
  // GET

  getMeals: ({ year, month }: TMealsParams) => apiClient.get(`/users/meals`, { params: { year, month } }),

  getLunchGroup: () => apiClient.get(`/users/playground/lunch-group`),

  assignLunchGroup: () => apiClient.post(`/users/playground/lunch-group`),

  submitMeal: (values: any) => apiClient.post(`/users/meals`, values),
  deleteMeal: (values: any) => apiClient.delete(`/users/meals/${values}`),
};
