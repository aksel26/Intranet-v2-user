// import { api } from '../client';

import { apiClient } from "../../client";

export const commuteService = {
  // GET

  // // 내 비밀번호 변경 API
  // export const changePassword = (values: any) => apiClient.patch(`/users/me/password`, values);
  // // 로그인한 사용자 기본정보 수정 API
  // export const changeMyInfo = (values: any) => apiClient.put(`/users/me`, values);

  checkIn: (values: any) => apiClient.post(`/users/intranet/check-in`, values),

  checkOut: (values: any) => apiClient.put(`/users/intranet/check-out`, values),
};
