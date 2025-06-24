import React, { useEffect, useState } from "react";
import { Badge, Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
// import { useApproveVacation } from "@/hooks/useSubmitForm";
// import notification from "@/components/GNB/Notification";
import { useQueryClient } from "@tanstack/react-query";
import { useDisclosure } from "@mantine/hooks";
import notification from "@/components/common/notification";
import { useApiMutation } from "@/api/useApi";
import { approvalService } from "@/api/services/approval/approval.service";

const StackLabelButton = ({ label, value, open, ...props }: any) => {
  return (
    <Group {...props}>
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
    </Group>
  );
};

const BadgeConfirmYN = ({ details }: { details: any }) => {
  const { confirmYN, confirmDate, rejectDate } = details;
  if (confirmYN === "Y") {
    return (
      <Group gap={8}>
        <Badge variant="light" color="green">
          승인
        </Badge>
        <Text c={"gray"} fz={"xs"}>
          {confirmDate}
        </Text>
      </Group>
    );
  } else if (confirmYN === "R") {
    return (
      <Group gap={8}>
        <Badge variant="light" color="red" size="sm">
          반려
        </Badge>
        <Text c={"gray"} fz={"xs"}>
          {rejectDate}
        </Text>
      </Group>
    );
  } else if (confirmYN === "N") {
    return (
      <Badge variant="light" color="yellow">
        승인 대기
      </Badge>
    );
  }
};

const ConfirmStatusButton = ({ details, close, confirm }: any) => {
  if (details.relationType === "CC") {
    return (
      <Button size="xs" variant="light" color="gray" fullWidth onClick={close}>
        닫기
      </Button>
    );
  } else {
    if (details.confirmYN === "R") {
      return (
        <Group wrap="nowrap">
          <Button size="xs" variant="light" color="blue" fullWidth onClick={() => confirm("N")}>
            반려 취소
          </Button>
          <Button size="xs" fullWidth variant="light" color="green" onClick={() => confirm("Y")}>
            승인하기
          </Button>
        </Group>
      );
    } else if (details.confirmYN === "Y") {
      return (
        <Group wrap="nowrap">
          <Button size="xs" fullWidth variant="light" color="blue" onClick={() => confirm("N")}>
            승인 취소
          </Button>
          <Button size="xs" variant="light" color="red" fullWidth onClick={() => confirm("R")}>
            반려하기
          </Button>
        </Group>
      );
    } else if (details.confirmYN === "N") {
      return (
        <Group wrap="nowrap">
          <Button size="xs" fullWidth variant="light" color="green" onClick={() => confirm("Y")}>
            승인하기
          </Button>
          <Button size="xs" variant="light" color="red" fullWidth onClick={() => confirm("R")}>
            반려하기
          </Button>
        </Group>
      );
    }
  }
};
const ApprovalConfirm = ({ opened, close, details }: any) => {
  console.log("details:", details);
  const queryClient = useQueryClient();
  //   const { mutate } = useApproveVacation();
  const [previewOpened, { open: previewOpen, close: previewClose }] = useDisclosure(false);

  const approve = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(approvalService.confirmApproval);

  const confirm = (confirm: string) => {
    approve.mutate(
      { commuteIdx: details.commuteIdx, confirmYN: confirm },
      {
        onSuccess: async () => {
          close();
          notification({
            title: `휴가신청 ${confirm === "R" ? "반려" : "승인"}하기`,
            color: "green",
            message: `휴가신청 내역이 ${confirm === "R" ? "반려" : "승인"} 되었습니다.`,
          });

          queryClient.invalidateQueries({
            predicate: (query) => {
              const queryKey = query.queryKey;
              const targetKeys = ["approvals", "vacationAll", "vacationSummary", "attendanceAllStaff"];
              return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
            },
          });
        },
        onError: (error: any) => {
          const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";

          notification({
            title: `휴가신청 ${confirm === "R" ? "반려" : "승인"}하기`,
            color: "red",
            message: errorMessage,
          });
        },
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} title={`휴가신청 결재`} centered size={"auto"}>
      <Group align="start" gap={"xl"}>
        <Stack pb={"md"} gap={"xs"}>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              요청자
            </Text>
            <Text fz={"xs"}>{details?.userName}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              유형
            </Text>
            <Text fz={"xs"}>{details?.leaveType}</Text>
          </Group>

          <StackLabelButton value={details?.imageName} open={previewOpen} label={"첨부파일"} />
        </Stack>
        <Stack pb={"md"} gap={"xs"}>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              기안날짜
            </Text>
            <Text fz={"xs"}>{dayjs(details?.createdAt).format("YYYY-MM-DD")}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              대상날짜
            </Text>
            <Text fz={"xs"}>{details?.commuteDate}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              상태
            </Text>
            <BadgeConfirmYN details={details} />
          </Group>
        </Stack>
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
