import type { TApproval } from "@/types/apiTypes/apiTypes";
import { apiClient } from "../../client";

export const approvalService = {
  // GET
  getApprovals: (params: TApproval) => apiClient.get(`/users/intranet/approval`, { params: params }),

  confirmApproval: (values: any) =>
    apiClient.patch(`/users/intranet/approval/${values.commuteIdx}`, {
      confirmYN: values.confirmYN,
    }),
};
