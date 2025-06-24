// import { api } from '../client';

import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const leaveService = {
  // GET

  getLeaves: (params: TYearMonth) => apiClient.get(`/users/intranet/leave/detail`, { params: params }),
  getMyLeaves: (params: TYearMonth) => apiClient.get(`/users/intranet/leave/detail`, { params: params }),

  getLeaveSummary: ({ year }: { year: string }) => apiClient.get(`/users/intranet/leave/stats`, { params: { year: year } }),

  // 사용자 개인 휴가 이미지 수정 API
  fileUpload: (values: any) => apiClient.patch(`/users/intranet/leave/${values.commuteIdx}/image`, { leaveImage: values.leaveImage }, { headers: { "Content-Type": "multipart/form-data" } }),

  getLeaveUsageStats: (params: TYearMonth) => apiClient.get(`/users/intranet/leave/stats`, { params: params }),

  deleteLeave: (values: any) =>
    apiClient.delete(`/users/intranet/leave/${values.commuteIdx}`, {
      data: values,
    }),

  requstLeave: (values: any) =>
    apiClient.post(`/users/intranet/leave`, values, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
