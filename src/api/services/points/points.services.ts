import type { TWelfaresParams } from "@/types/meal";
import { apiClient } from "../../client";

export const pointsService = {
  // GET

  getUsedPoint: ({ year, halfYear }: TWelfaresParams) => apiClient.get(`/users/welfares`, { params: { year, halfYear } }),
  createPoint: (values: any) => {
    console.log(values);
    return apiClient.post(`/users/welfares`, values);
  },
  updatePoint: (values: any) => apiClient.put(`/users/welfares/${values.queryParams}`, values.body),
  deleteWelfare: (values: any) => apiClient.delete(`/users/welfares/${values}`),
};
