import type { TActivityParams, TWelfaresParams } from "@/types/meal";
import { apiClient } from "../../client";

export const activityService = {
  // GET

  getUsedActivity: ({ year, halfYear }: TActivityParams) => apiClient.get(`/users/activities`, { params: { year, halfYear } }),

  createActivity: (values: any) => apiClient.post(`/users/activities`, values),

  updateActivity: (values: any) => apiClient.put(`/users/activities/${values.queryParams}`, values.body),

  deleteActivity: (values: any) => apiClient.delete(`/users/activities/${values}`),
};
