import { useCheckOut } from "@/hooks/useSubmitForm";
import useTimeByLeaveType from "@/hooks/useTimeByLeaveType";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { attendanceStore } from "@/lib/store/ui/attendanceStore";
import { checkOutTimeValidation } from "@/utils/checkOutTimeValidation";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef } from "react";
import notification from "../GNB/Notification";
import EarlyCheckOut from "./EarlyCheckOut";
import InTimeCheckOut from "./InTimeCheckOut";

function CheckOutWrapper({ checkOutModalClose, checkOutTimeOpened }: any) {
  const { myInfo } = myInfoStore();
  const { mutate: checkOut } = useCheckOut();
  //   const { hours } = checkOutTimeValidation(myInfo.checkInTime);

  const reasonRef = useRef<any>();
  const queryClient = useQueryClient();
  // const { setCheckInTime } = attendanceStore();
  const totalTime = useTimeByLeaveType(myInfo?.leaveTypeIdx);
  const { hours } = useMemo(() => {
    return checkOutTimeValidation(myInfo?.checkInTime);
  }, [myInfo]);

  const handleCheckOut = () => {
    const reason = reasonRef?.current?.value || null;
    checkOut(
      {
        // checkOutDeviceType: device,
        checkOutTime: dayjs().toISOString(),
        earlyLeaveReason: reason,
      },
      {
        onSuccess: async (data) => {
          console.log("data: ", data);
          const { checkInTime } = data.data;
          const checkInTimeFormat = dayjs(checkInTime).format("HH:mm:ss");
          notification({
            color: "green",
            message: `${checkInTimeFormat}에 퇴근완료 되었습니다.`,
            title: "퇴근",
          });
          await queryClient.invalidateQueries({ queryKey: ["me"] });
          checkOutModalClose();
        },
        onError: (error: any) => {
          console.log("error: ", error);
          const { message: err } = error.response.data || "";
          notification({
            color: "red",
            message: err,
            title: "퇴근",
          });
        },
      }
    );
  };
  return (
    <Modal opened={checkOutTimeOpened} onClose={checkOutModalClose} title="퇴근하기" centered size={"xs"}>
      <Text>
        {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>
        님,
      </Text>
      {hours < totalTime ? <EarlyCheckOut reasonRef={reasonRef} /> : <InTimeCheckOut />}
      <Group wrap="nowrap" mt={"md"}>
        <Button fullWidth onClick={handleCheckOut}>
          퇴근하기
        </Button>
        <Button fullWidth variant="light" color="gray.8" onClick={checkOutModalClose}>
          닫기
        </Button>
      </Group>
    </Modal>
  );
}

export default CheckOutWrapper;
