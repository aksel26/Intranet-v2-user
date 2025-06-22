// import { api } from '../client';

import { apiClient } from "../../client";

export const attendanceService = {
  // GET

  getUsersAttendance: (params: any) =>
    apiClient.get(`/users/intranet/leave/all/calender`, { params: params }),
};
