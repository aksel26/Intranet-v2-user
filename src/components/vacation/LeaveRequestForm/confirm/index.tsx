// import { useLeave } from "@/hooks/useSubmitForm";
import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
// import notification from "../GNB/Notification";
import { useQueryClient } from "@tanstack/react-query";
// import { getLeaveTypeKey } from "@/utils/leaveTypeKey";
import { AxiosError } from "axios";
import notification from "@/components/global/notification";
import { getLeaveTypeKey } from "@/utils/leave/getLeaveTypeByKey";
import { useApiMutation } from "@/api/useApi";
import { leaveService } from "@/api/services/leave/leave.services";
import { Info } from "lucide-react";
function VacationConfirmModal({ opened, close, submitInfo, confirmPerson, closeDrawer, file }: any) {
  const queryClient = useQueryClient();
  const requestLeave = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(leaveService.requstLeave, {
    invalidateKeys: [["attendanceAllStaff", "vacationSummary", "approvals", "approvalNew", "vacationAll"]],
    onSuccess: async () => {
      notification({
        color: "green",
        title: "휴가 신청 완료",
        message: "결재자의 승인을 기다려주세요.",
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["attendanceAllStaff", "vacationSummary", "approvals", "approvalNew", "vacationAll"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
      close();
      closeDrawer();
    },
    onError: (error: Error) => {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "휴가 신청",
        color: "red",
        message: errorMessage,
      });
    },
  });

  //   const { mutate: leave } = useLeave();

  const submit = () => {
    const temp = { ...submitInfo };
    temp.approverIdxs = submitInfo.confirmPerson.map((item: any) => Number(item));
    delete temp.confirmPerson;
    requestLeave.mutate({ dto: temp, leaveImage: file });
  };
  return (
    <Modal opened={opened} onClose={close} title="휴가 신청 확인" centered>
      {/* Modal content */}

      <Alert variant="outline" color="lime" title="휴가 신청 내용" icon={<Info />}>
        <Stack gap={"xs"}>
          <Text fz={"md"} fw={500}>
            {getLeaveTypeKey(submitInfo?.leaveInfo[0].leaveTypeIdx)}
          </Text>

          <Stack gap={2}>
            {submitInfo?.leaveInfo?.map((info: any, key: number) => (
              <Group key={key}>
                <Text fz={"sm"} c={"dimmed"}>{`${dayjs(info?.commuteDate).format("YYYY-MM-DD (dd요일)")} `}</Text>
              </Group>
            ))}
            <Text c={"dimmed"} fz={"sm"}>
              승인자 : {confirmPerson?.map((person: any) => person.label).join(", ")}
            </Text>
          </Stack>
        </Stack>
      </Alert>
      <Group wrap="nowrap" mt={"md"}>
        <Button onClick={submit} fullWidth>
          신청하기
        </Button>
        <Button onClick={close} color="gray.5" fullWidth>
          취소
        </Button>
      </Group>
    </Modal>
  );
}

export default VacationConfirmModal;
