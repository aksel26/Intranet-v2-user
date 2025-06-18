import { useCheckIn } from "@/hooks/useSubmitForm";
import { Alert, Button, Group, Modal, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import notification from "../GNB/Notification";
import { checkMorningLeave } from "@/utils/earlyCheckIn";
import { myInfoStore } from "@/lib/store/myInfoStore";

const EarlyCheckIn = ({ opened, close, checkInModalClose }: any) => {
  const { mutate: checkIn } = useCheckIn();
  const queryClient = useQueryClient();
  const { myInfo } = myInfoStore();
  const result = checkMorningLeave(myInfo?.leave ?? []);

  const handleCheckIn = () => {
    if (!result) {
      notification({
        color: "red",
        message: "출근 확인 중 문제가 발생하였습니다.",
        title: "출근하기",
      });
      return;
    }
    checkIn(
      { checkInTime: result?.targetTime },
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
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} centered size={"xs"} withCloseButton={false}>
      <Alert color="blue" title="출근시간 확인">
        <Text fz={"sm"}>
          휴가 당일 오전 10시 이전 출근 시, <br /> 오전 10시 출근으로 기록됩니다.{" "}
        </Text>
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
