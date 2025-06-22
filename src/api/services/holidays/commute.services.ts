// import { api } from '../client';

import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const holidaysService = {
  // GET

  getHolidays: (params: TYearMonth) =>
    apiClient.get(`/users/intranet/holiday`, { params: params }),
};
