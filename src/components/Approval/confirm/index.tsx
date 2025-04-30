import React from "react";
import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { useApproveVacation } from "@/hooks/useSubmitForm";
import notification from "@/components/GNB/Notification";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";

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

const StackLabelButton = ({ label, value, open, ...props }: any) => {
  return (
    <Stack gap={2} {...props}>
      <Text fz={"xs"} c={"dimmed"}>
        {label}
      </Text>

      {value ? (
        <Text td="underline" c={"blue"} fz={"xs"} styles={{ root: { cursor: "pointer" } }} onClick={open}>
          {value}
        </Text>
      ) : (
        <Text c={"dimmed"} fz={"xs"}>
          없음
        </Text>
      )}
    </Stack>
  );
};

const ConfirmStatusButton = ({ details, close, confirm }: any) => {
  if (details.relationType === "CC") {
    return (
      <Button size="xs" variant="light" color="gray" fullWidth onClick={close}>
        닫기
      </Button>
    );
  } else {
    if (details.confirmYN === "Y") {
      return (
        <Button size="xs" variant="light" color="red" fullWidth onClick={() => confirm("N")}>
          취소하기
        </Button>
      );
    } else {
      return (
        <Group wrap="nowrap">
          <Button size="xs" fullWidth variant="light" color="green" onClick={() => confirm("Y")}>
            승인하기
          </Button>
          <Button size="xs" variant="light" color="red" fullWidth onClick={() => confirm("N")}>
            반려하기
          </Button>
        </Group>
      );
    }
  }
};
const ApprovalConfirm = ({ opened, close, details }: any) => {
  console.log("🚀 ~ ApprovalConfirm ~ details:", details);
  const queryClient = useQueryClient();
  const { mutate } = useApproveVacation();
  const [previewOpened, { open: previewOpen, close: previewClose }] = useDisclosure(false);
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
        <StackLabelButton value={details?.imageName} open={previewOpen} label={"청부파일"} />
      </Group>
      <Group pb={"md"}>
        <StackLabelText value={dayjs(details?.createdAt).format("YYYY-MM-DD")} label={"기안일"} />
        <StackLabelText value={details?.commuteDate} label={"대상일"} />
      </Group>
      <ConfirmStatusButton details={details} close={close} confirm={confirm} />
      <Modal opened={previewOpened} onClose={previewClose} title="첨부 이미지 미리보기">
        <img src={details?.imageUrl || ""} alt="preview" />
        <Button fullWidth size="sm" fz={"xs"} variant="light" color="gray" mt={"md"} onClick={previewClose}>
          닫기
        </Button>
      </Modal>
    </Modal>
  );
};

export default ApprovalConfirm;
