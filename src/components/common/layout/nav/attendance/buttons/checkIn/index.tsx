// import { useCheckIn } from "@/hooks/useSubmitForm";
import { Badge, Box, Button, Group, Modal, Stack, Text } from "@mantine/core";

import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
// import notification from "../GNB/Notification";
// import { myInfoStore } from "@/lib/store/myInfoStore";
// import { TLeaveMyInfo } from "@/lib/types/myInfo";
// import { checkMorningLeave } from "@/utils/earlyCheckIn";
import { useDisclosure } from "@mantine/hooks";
// import EarlyCheckIn from "./EarlyCheckIn";
import { attendanceService } from "@/api/services/attendance/attendance.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
import { myInfoStore } from "@/store/myInfoStore";
import type { TLeaveMyInfo } from "@/types/myInfo";
import { checkMorningLeave } from "@/utils/commute/checkEarly";
import EarlyCheckIn from "./earlyCheckIn";
import useCheckInTime from "@/hooks/useCheckInTime";

function CheckIn({ checkInModalClose, checkInTimeOpened }: any) {
  const { myInfo } = myInfoStore();
  // const { mutate: checkIn } = useCheckIn();
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { isBefore8AM, checkIsBefore6AM } = useCheckInTime();

  const leaveList = myInfo?.leave || [];

  const checkIn = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    { checkInTime: Date | string } // 요청 파라미터 타입
  >(attendanceService.checkIn, {
    invalidateKeys: [["me"]],
    onSuccess: async (data: any) => {
      const { checkInTime } = data.data;
      const checkInTimeFormat = dayjs(checkInTime).format("HH:mm:ss");
      notification({
        color: "green",
        message: `${checkInTimeFormat}에 출근완료 되었습니다.`,
        title: "출석체크",
      });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      close();
      checkInModalClose();
    },
    onError: (error: any) => {
      const { message: err } = error.response.data || "";
      notification({
        color: "red",
        message: err,
        title: "출석체크",
      });
      close();
    },
  });

  const handleCheckIn = () => {
    if (checkIsBefore6AM()) {
      return notification({
        color: "yellow",
        message: "오전 6시 이후로 출근이 가능합니다.",
        title: "출석체크",
      });
    }

    const result = checkMorningLeave(myInfo?.leave ?? []);
    if (result?.shouldExecute) {
      open();
      return;
    }

    checkIn.mutate({ checkInTime: dayjs().toISOString() });
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
      {isBefore8AM ? (
        <Text c={"yellow.7"} fz={"sm"} mt={"md"}>
          ☝️ 오전 8시 이전에는 '현장출근'으로 기록됩니다.
        </Text>
      ) : null}
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
