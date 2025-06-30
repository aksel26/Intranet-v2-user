// import { api } from '../client';

import { apiClient } from "../../client";

export const smsService = {
  // GET

  // 사용자 SMS 발송 내역 조회 API

  getAllSMS: () => apiClient.get<any[]>("/users/notification/sms"),

  // 사용자 SMS 발송 API

  sendSMS: (values: any) => apiClient.post("/users/notification/sms", values),
};
