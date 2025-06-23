// import { api } from '../client';

import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const leaveService = {
  // GET

  getLeaves: (params: TYearMonth) => apiClient.get(`/users/intranet/leave/detail`, { params: params }),
  getMyLeaves: (params: TYearMonth) => apiClient.get(`/users/intranet/leave/detail`, { params: params }),

  getLeaveSummary: ({ year }: { year: string }) => apiClient.get(`/users/intranet/leave/stats`, { params: { year: year } }),

  requstLeave: (values: any) =>
    apiClient.post(`/users/intranet/leave`, values, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
