// import { api } from '../client';

import { apiClient } from "../../client";

export const drinkService = {
  // GET

  getDrinks: ({ month }: { month: string }) =>
    apiClient.get(`/users/playground/monthly-baverage`, {
      params: { month: month },
    }),
  updateDrink: (values: any) =>
    apiClient.put(`/users/playground/monthly-baverage`, values),
};
