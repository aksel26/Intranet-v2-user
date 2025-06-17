"use client";

import { useCheckIn } from "@/hooks/useSubmitForm";
import { Badge, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import notification from "../GNB/Notification";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { TLeaveMyInfo } from "@/lib/types/myInfo";
import { checkMorningLeave } from "@/utils/earlyCheckIn";
import { useDisclosure } from "@mantine/hooks";
import EarlyCheckIn from "./EarlyCheckIn";

function CheckIn({ checkInModalClose, checkInTimeOpened }: any) {
  const { myInfo } = myInfoStore();
  const { mutate: checkIn } = useCheckIn();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const leaveList = myInfo?.leave || [];

  const handleCheckIn = () => {
    const result = checkMorningLeave(myInfo?.leave ?? []);
    if (result?.shouldExecute) {
      open();
      return;
    }

    checkIn(
      { checkInTime: dayjs().toISOString() },
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
          checkInModalClose();
        },
        onError: (error: any) => {
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            message: err,
            title: "출석체크",
          });
          checkInModalClose();
        },
      }
    );
  };

  return (
    <Modal opened={checkInTimeOpened} onClose={checkInModalClose} title="출근하기" centered size={"xs"}>
      <Box pos={"relative"}>
        {leaveList.length > 0 ? (
          <Stack right={0} pos={"absolute"} top={0} gap={"xs"} align="end">
            {myInfo?.leave.map((item: TLeaveMyInfo) => (
              <Badge size="sm" radius={"sm"} color="lime" variant="light" key={item.leaveTypeIdx}>
                {item.leaveType}
              </Badge>
            ))}
          </Stack>
        ) : null}
        <Text>
          {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>
          님,
        </Text>
        <Text>반갑습니다. 👋 </Text>
      </Box>
      <Text c={"dimmed"} fz={"sm"} mt={"md"}>
        아래 버튼을 눌러 출근을 완료해 주세요.
      </Text>
      <Group wrap="nowrap" mt={"md"}>
        <Button fullWidth onClick={handleCheckIn} data-autofocus>
          출근하기
        </Button>
        <Button fullWidth variant="light" color="gray.8" onClick={checkInModalClose}>
          닫기
        </Button>
      </Group>
      <EarlyCheckIn opened={opened} close={close} checkInModalClose={checkInModalClose} checkIn={handleCheckIn} />
    </Modal>
  );
}

export default CheckIn;
