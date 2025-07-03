// import { useCheckIn } from "@/hooks/useSubmitForm";
import { Alert, Button, Group, Modal, Text } from "@mantine/core";

import dayjs from "dayjs";
// import notification from "../GNB/Notification";
// import { checkMorningLeave } from "@/utils/earlyCheckIn";
import { attendanceService } from "@/api/services/attendance/attendance.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
import { myInfoStore } from "@/store/myInfoStore";
import { checkMorningLeave } from "@/utils/commute/checkEarly";
// import { myInfoStore } from "@/lib/store/myInfoStore";

const EarlyCheckIn = ({ opened, close, checkInModalClose }: any) => {
  const { myInfo } = myInfoStore();
  const result = checkMorningLeave(myInfo?.leave ?? []);
  // const {mutate:checkIn}= useApiMutation()
  // ✅ 사용 예시 - 타입을 명시적으로 지정
  const checkIn = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    { checkInTime: Date | string } // 요청 파라미터 타입
  >(attendanceService.checkIn, {
    invalidateKeys: [["me"]],
    onSuccess: async (data: any) => {
      // const { checkInTime } = data.data;
      // const checkInTimeFormat = dayjs(checkInTime).format("HH:mm:ss");
      notification({
        color: "green",
        message: `출근완료 되었습니다.`,
        title: "출석체크",
      });
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
    if (!result) {
      notification({
        color: "red",
        message: "출근 확인 중 문제가 발생하였습니다.",
        title: "출근하기",
      });
      return;
    }

    checkIn.mutate({ checkInTime: result?.targetTime });
  };
  return (
    <Modal opened={opened} onClose={close} centered size={"xs"} withCloseButton={false}>
      <Alert color="blue" title="출근시간 확인">
        <Text mb={4} fz={"sm"}>
          ☝️ 출근 시간 기준
        </Text>
        <Group gap={"xs"}>
          <Text fz={"sm"} c={"gray"} w={70}>
            오전 반반차:
          </Text>
          <Text fz={"sm"}>11:00 부터 시작</Text>
        </Group>
        <Group gap={"xs"}>
          <Text fz={"sm"} c={"gray"} w={70}>
            오전 반차:
          </Text>
          <Text fz={"sm"}>13:30 부터 시작</Text>
        </Group>
      </Alert>
      <Group wrap="nowrap" mt={"md"}>
        <Button onClick={handleCheckIn} fullWidth>
          확인
        </Button>
        <Button onClick={close} color="gray" fullWidth variant="light">
          취소
        </Button>
      </Group>
    </Modal>
  );
};

export default EarlyCheckIn;
