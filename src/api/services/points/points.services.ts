import type { TWelfaresParams } from "@/types/meal";
import { apiClient } from "../../client";

export const pointsService = {
  // GET

  getUsedPoint: ({ year, halfYear }: TWelfaresParams) => apiClient.get(`/users/welfares`, { params: { year, halfYear } }),
  updatePoint: (values: any) => apiClient.put(`/users/welfares/${values.queryParams}`, values.body),
  deleteWelfare: (values: any) => apiClient.delete(`/users/welfares/${values}`),
};
