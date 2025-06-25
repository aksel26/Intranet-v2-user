import { apiClient } from "../../client";

export const newService = {
  // GET

  // 사용자 결제승인 NEW 존재 확인 API
  approvalHasNew: () => apiClient.get(`/users/intranet/approval/has-new`),

  // 사용자 공지사항 NEW 존재 확인 API

  noticeHasNew: () => apiClient.get(`/users/notices/has-new`),
  updateNew: (values: any) => apiClient.patch(`/users/intranet/approval/${values.commuteIdx}/last-check`, values.body),
};
