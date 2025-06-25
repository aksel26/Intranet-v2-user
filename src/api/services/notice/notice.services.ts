import type { TNotice } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const noticeService = {
  // GET

  getNotices: (params: TNotice) => apiClient.get(`/users/notices`, { params: params }),

  getNoticeDetail: ({ noticeIdx }: { noticeIdx: number }) =>
    apiClient.get(`/users/notices/${noticeIdx}`, {
      params: { noticeIdx: noticeIdx },
    }),
};
