import type { TNotice } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const noticeService = {
  // GET

  getNotices: (params: TNotice) =>
    apiClient.get(`/users/notices`, { params: params }),

  getNoticeDetail: ({ noticeIdx }: { noticeIdx: number }) =>
    apiClient.get(`/users/notices/${noticeIdx}`, {
      params: { noticeIdx: noticeIdx },
    }),

  createNotice: (params: TNotice) =>
    apiClient.post(`/users/notices`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  // 사용자 공지사항 수정 API
  updateNotice: (params: any) =>
    apiClient.post(`/users/notices/${params.noticeIdx}`, params, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
