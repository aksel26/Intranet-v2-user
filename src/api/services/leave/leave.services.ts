// import { api } from '../client';

import { apiClient } from "../../client";

export const leaveService = {
  // GET

  getLeaveSummary: ({ year }: { year: string }) =>
    apiClient.get(`/users/intranet/leave/stats`, { params: { year: year } }),

  requstLeave: (values: any) =>
    apiClient.post(`/users/intranet/leave`, values, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};
