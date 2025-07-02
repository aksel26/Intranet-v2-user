import { apiClient } from "../../client";

export const meetingService = {
  // GET

  getMeetings: (params: any) => apiClient.get(`/users/meetings`, { params: params }),

  updateMeetings: ({ body: params, idx: idx }: any) => apiClient.put(`/users/meetings/${idx}`, params),

  deleteMeetings: (reservationIdx: number) => apiClient.delete(`/users/meetings/${reservationIdx}`),

  // 회의실 예약하기 API
  createMeeting: (params: any) => apiClient.post(`/users/meetings`, params),
};
