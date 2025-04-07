import notification from "@/components/GNB/Notification";
import { useDeleteVacation } from "@/hooks/useSubmitForm";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const LabelText = ({ children }: any) => {
  return (
    <Text fz={"xs"} c={"dimmed"}>
      {children}
    </Text>
  );
};

const CancleVacation = ({ opened, close, details }: any) => {
  const { mutate } = useDeleteVacation();

  const queryClient = useQueryClient();

  const confirm = () => {
    mutate(
      { commuteIdx: details.commuteIdx },
      {
        onSuccess: async () => {
          close();
          notification({
            title: "휴가신청 취소하기",
            color: "green",
            message: "휴가신청 내역이 삭제되었습니다.",
          });

          queryClient.invalidateQueries({
            predicate: (query) => {
              const queryKey = query.queryKey;
              const targetKeys = ["vacationAll", "attendanceSummary", "vacationAll", "vacationSummary"];
              return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
            },
          });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";
          notification({
            title: "휴가신청 취소하기",
            color: "red",
            message: errorMessage,
          });
        },
      }
    );
  };

  return (
    <Modal opened={opened} onClose={close} title="휴가신청 취소하기" centered size={"sm"}>
      {!details ? null : (
        <Stack>
          <Stack gap={2}>
            <LabelText>일자</LabelText>
            <Text fz={"xs"}>{details.commuteDate}</Text>
          </Stack>
          <Group gap={"xl"} mb={"md"}>
            <Stack gap={2}>
              <LabelText>유형</LabelText>
              <Text fz={"xs"}>{details.leaveType}</Text>
            </Stack>
            <Stack gap={2}>
              <LabelText>상태</LabelText>
              <Text fz={"xs"}>{details.confirmStatus}</Text>
            </Stack>
            <Stack gap={2}>
              <LabelText>결재 대상</LabelText>
              <Group>
                {details.approverInfo.map((approver: any) => (
                  <Text fz="xs" key={approver.approverIdx}>
                    {approver.approverName}
                  </Text>
                ))}
              </Group>
            </Stack>
          </Group>
          <Group wrap="nowrap">
            <Button size="xs" fullWidth variant="light" color="red" onClick={confirm}>
              취소하기
            </Button>
            <Button size="xs" variant="light" color="gray" fullWidth onClick={close}>
              닫기
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
};

export default CancleVacation;
