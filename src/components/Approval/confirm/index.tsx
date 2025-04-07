import React from "react";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useApproveVacation } from "@/hooks/useSubmitForm";
import notification from "@/components/GNB/Notification";
import { useQueryClient } from "@tanstack/react-query";

const StackLabelText = ({ label, value, ...props }: any) => {
  return (
    <Stack gap={2} {...props}>
      <Text fz={"xs"} c={"dimmed"}>
        {label}
      </Text>
      <Text fz={"xs"}>{value}</Text>
    </Stack>
  );
};
const ApprovalConfirm = ({ opened, close, details }: any) => {
  const queryClient = useQueryClient();
  const { mutate } = useApproveVacation();

  const confirm = (confirm: string) => {
    mutate(
      { commuteIdx: details.commuteIdx, confirmYN: confirm },
      {
        onSuccess: async () => {
          close();
          notification({
            title: "휴가신청 승인하기",
            color: "green",
            message: "휴가신청 내역이 승인되었습니다.",
          });
          queryClient.invalidateQueries({
            queryKey: ["approvals"],
          });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";

          notification({
            title: "휴가신청 승인하기",
            color: "red",
            message: errorMessage,
          });
        },
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} title="휴가신청 승인하기" centered size={"sm"}>
      <Group pb={"md"} justify="space-between">
        <StackLabelText value={details?.userName} label={"요청자"} />
        <StackLabelText value={details?.leaveType} label={"유형"} />
        <StackLabelText value={details?.confirmStatus} label={"상태"} />
        <StackLabelText value={"hi"} label={"첨부파일"} />
      </Group>
      <Group pb={"md"}>
        <StackLabelText value={dayjs(details?.createdAt).format("YYYY-MM-DD")} label={"기안일"} />
        <StackLabelText value={details?.commuteDate} label={"대상일"} />
      </Group>
      <Group wrap="nowrap">
        <Button size="xs" fullWidth variant="light" color="green" onClick={() => confirm("Y")}>
          승인하기
        </Button>
        <Button size="xs" variant="light" color="red" fullWidth onClick={() => confirm("N")}>
          반려하기
        </Button>
      </Group>
    </Modal>
  );
};

export default ApprovalConfirm;
