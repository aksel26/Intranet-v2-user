// import { api } from '../client';

import { apiClient } from "../../client";

export const userService = {
  // GET
  getAll: () => apiClient.get<any[]>("/users/ids"),
  getMe: () => apiClient.get<any>("/users/me"),
  getBirth: ({ month }: { month: string }) => apiClient.get(`/users/birth`, { params: { month: month } }),

  // // 내 비밀번호 변경 API
  // export const changePassword = (values: any) => apiClient.patch(`/users/me/password`, values);
  // // 로그인한 사용자 기본정보 수정 API
  // export const changeMyInfo = (values: any) => apiClient.put(`/users/me`, values);

  // PUT/PATCH
  updatePassword: (values: any) => apiClient.patch(`/users/me/password`, values),
  updateUserInfo: (values: any) => apiClient.put(`/users/me`, values),

  logout: () => apiClient.post(`/logout`),
};
