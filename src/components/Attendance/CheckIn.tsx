"use client";

import { useCheckIn } from "@/hooks/useSubmitForm";
import { Button, Group, Modal, Text } from "@mantine/core";

import { getDeviceType } from "@/utils/userAgent";
import dayjs from "dayjs";
import notification from "../GNB/Notification";
import { useQueryClient } from "@tanstack/react-query";

function CheckIn({ myInfo, onWorkModalClose, onWorkTimeOpened }: any) {
  const { mutate: checkIn } = useCheckIn();
  const queryClient = useQueryClient();
  const handleCheckIn = () => {
    const device = getDeviceType();
    checkIn(
      { checkInDeviceType: device, checkInTime: dayjs().toISOString() },
      {
        onSuccess: async (data) => {
          const { checkInTime } = data.data;
          const checkInTimeFormat = dayjs(checkInTime).format("HH:mm:ss");
          notification({
            color: "green",
            message: `${checkInTimeFormat}에 출근완료 되었습니다.`,
            title: "출석체크",
          });
          await queryClient.invalidateQueries({ queryKey: ["me"] });
          onWorkModalClose();
        },
        onError: (error: any) => {
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            message: err,
            title: "출석체크",
          });
          onWorkModalClose();
        },
      }
    );
  };

  return (
    <Modal opened={onWorkTimeOpened} onClose={onWorkModalClose} title="출근하기" centered size={"xs"}>
      <Text>
        {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>
        님,
      </Text>
      <Text>반갑습니다. 👋 </Text>
      <Text c={"dimmed"} fz={"sm"} mt={"md"}>
        아래 버튼을 눌러 출근을 완료해 주세요.
      </Text>
      <Group wrap="nowrap" mt={"md"}>
        <Button fullWidth onClick={handleCheckIn} data-autofocus>
          출근하기
        </Button>
        <Button fullWidth variant="light" color="gray.8" onClick={onWorkModalClose}>
          닫기
        </Button>
      </Group>
    </Modal>
  );
}

export default CheckIn;
