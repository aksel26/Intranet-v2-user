// import { useCheckOut } from "@/hooks/useSubmitForm";
// import { myInfoStore } from "@/lib/store/myInfoStore";
// import { checkOutTimeValidation } from "@/utils/checkOutTimeValidation";
import { Button, Group, Modal, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useMemo, useRef } from "react";
// import notification from "../GNB/Notification";
// import EarlyCheckOut from "./EarlyCheckOut";
// import InTimeCheckOut from "./InTimeCheckOut";
import { myInfoStore } from "@/store/myInfoStore";
import notification from "@/components/common/notification";
import EarlyCheckOut from "../earlyCheckOut";
import InTimeCheckOut from "..";
import { checkOutTimeValidation } from "@/utils/commute/checkOutTime";
import { useApiMutation } from "@/api/useApi";
import { attendanceService } from "@/api/services/attendance/attendance.services";

function CheckOutWrapper({ checkOutModalClose, checkOutTimeOpened }: any) {
  const { myInfo } = myInfoStore();

  const checkOut = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(attendanceService.checkOut, {
    onSuccess: async (data) => {
      const { checkInTime } = data.data;
      const checkInTimeFormat = dayjs(checkInTime).format("HH:mm:ss");
      notification({
        color: "green",
        message: `${checkInTimeFormat}에 퇴근완료 되었습니다.`,
        title: "퇴근",
      });
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.invalidateQueries({
        queryKey: ["attendanceSummary"],
      });
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
  });

  // const { mutate: checkOut } = useCheckOut();

  const reasonRef = useRef<any>(null);
  const queryClient = useQueryClient();

  const isEarlyCheckout = useMemo(() => {
    return checkOutTimeValidation(myInfo?.availCheckOutTime);
  }, [myInfo]);

  const handleCheckOut = () => {
    const reason = reasonRef?.current?.value || null;
    checkOut.mutate({
      checkOutTime: dayjs().toISOString(),
      earlyLeaveReason: reason,
    });
  };
  return (
    <Modal opened={checkOutTimeOpened} onClose={checkOutModalClose} title="퇴근하기" centered size={"xs"}>
      <Text>
        {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>
        님,
      </Text>
      {isEarlyCheckout ? <EarlyCheckOut reasonRef={reasonRef} /> : <InTimeCheckOut />}
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
