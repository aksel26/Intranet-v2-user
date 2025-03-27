import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import React from "react";

const LabelText = ({ children }: any) => {
  return (
    <Text fz={"xs"} c={"dimmed"}>
      {children}
    </Text>
  );
};

const CancleVacation = ({ opened, close, details }: any) => {
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
            <Button size="xs" fullWidth variant="light" color="red" onClick={close}>
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
