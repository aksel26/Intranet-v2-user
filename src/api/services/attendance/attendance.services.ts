// import { api } from '../client';

import type { TMyAttendance } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const attendanceService = {
  // GET

  getUsersAttendance: (params: any) => apiClient.get(`/users/intranet/leave/all/calender`, { params: params }),

  // 개인 출퇴근 내역 조회 API

  getMyAttendance: (params: TMyAttendance) => apiClient.get(`/users/intranet/commute`, { params: params }),

  checkIn: (values: any) => apiClient.post(`/users/intranet/check-in`, values),

  checkOut: (values: any) => apiClient.put(`/users/intranet/check-out`, values),

  updateAttendanceNote: (values: any) => apiClient.patch(`/users/intranet/commute/${values.commuteIdx}/note`, values.body),
};
