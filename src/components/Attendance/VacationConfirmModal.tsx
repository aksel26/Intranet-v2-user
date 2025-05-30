import { useLeave } from "@/hooks/useSubmitForm";
import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import notification from "../GNB/Notification";
import IconInfoCircle from "/public/icons/info-circle.svg";
import { useQueryClient } from "@tanstack/react-query";
import { getLeaveTypeKey } from "@/utils/leaveTypeKey";
import { AxiosError } from "axios";
function VacationConfirmModal({ opened, close, submitInfo, confirmPerson, closeDrawer, file }: any) {
  const { mutate: leave } = useLeave();
  const queryClient = useQueryClient();
  const submit = () => {
    const temp = { ...submitInfo };
    temp.approverIdxs = submitInfo.confirmPerson.map((item: any) => Number(item));
    delete temp.confirmPerson;
    leave(
      { dto: temp, leaveImage: file },
      {
        onError: (error: Error) => {
          const axiosError = error as AxiosError<{ message: string }>;
          const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
          notification({ title: "휴가 신청", color: "red", message: errorMessage });
        },
        onSuccess: async (data: any) => {
          notification({ color: "green", title: "휴가 신청 완료", message: "결재자의 승인을 기다려주세요." });
          queryClient.invalidateQueries({
            predicate: (query) => {
              const queryKey = query.queryKey;
              const targetKeys = ["attendanceAllStaff", "vacationSummary", "approvals", "approvalNew"];
              return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
            },
          });
          close();
          closeDrawer();
        },
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} title="휴가 신청 확인" centered>
      {/* Modal content */}

      <Alert variant="light" color="lime" title="휴가 신청 내용" icon={<IconInfoCircle />}>
        <Stack gap={"xs"}>
          <Text fz={"sm"} fw={500}>
            {getLeaveTypeKey(submitInfo?.leaveInfo[0].leaveTypeIdx)}
          </Text>

          {submitInfo?.leaveInfo?.map((info: any, key: number) => (
            <Group key={key}>
              <Text fz={"xs"} c={"dimmed"}>{`${dayjs(info?.commuteDate).format("YYYY-MM-DD (dd요일)")} `}</Text>
            </Group>
          ))}
          <Text c={"dimmed"} fz={"xs"}>
            승인자 : {confirmPerson?.map((person: any) => person.label).join(", ")}
          </Text>
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
