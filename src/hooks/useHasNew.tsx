import { newService } from "@/api/services/new/new.services";
import { useApiQuery } from "@/api/useApi";

export const useHasNew = () => {
  const { data: approvalData } = useApiQuery(["approvalNew"], newService.approvalHasNew);

  const { data: noticeData } = useApiQuery(["noticeNew"], newService.noticeHasNew);

  return {
    approval: approvalData?.data?.data?.hasNew ?? false,
    notice: noticeData?.data?.data?.hasNew ?? false,
  };
};
