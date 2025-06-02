import { approvalHasNew, noticeHasNew } from "@/app/api/get/getApi";
import { useQuery } from "@tanstack/react-query";

export const useHasNew = () => {
  const { data: approvalData } = useQuery({
    queryKey: ["approvalNew"],
    queryFn: approvalHasNew,
  });

  const { data: noticeData } = useQuery({
    queryKey: ["noticeNew"], // 고유한 키로 변경
    queryFn: noticeHasNew,
  });

  return {
    approval: approvalData?.data?.data?.hasNew ?? false,
    notice: noticeData?.data?.data?.hasNew ?? false,
  };
};
