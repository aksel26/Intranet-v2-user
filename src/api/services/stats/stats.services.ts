// import { api } from '../client';

import type { TWorkHourStats } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const statsService = {
  // GET

  getWorkHourStats: (params: TWorkHourStats) => apiClient.get(`/users/intranet/commute/work-hours`, { params: params }),
};
