import { useLeave } from "@/hooks/useSubmitForm";
import { Alert, Button, Group, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import notification from "../GNB/Notification";
import IconInfoCircle from "/public/icons/info-circle.svg";
function VacationConfirmModal({ opened, close, submitInfo, closeDrawer }: any) {
  const { mutate: leave } = useLeave();

  const submit = () => {
    const temp = { ...submitInfo };
    temp.confirmPersonIdx = Number(submitInfo?.confirmPerson.value);
    delete temp.confirmPerson;
    leave(
      { dto: temp },
      {
        onError: (error: any) => {
          notification({ color: "red", title: "휴가 신청", message: "휴가 신청 중 오류가 발생하였습니다." });
        },
        onSuccess: (data: any) => {
          notification({ color: "green", title: "휴가 신청 완료", message: "결재자의 승인을 기다려주세요." });
          close();
          closeDrawer();
        },
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} title="휴가 신청 확인" centered>
      {/* Modal content */}

      <Alert variant="light" color="lime" title="휴가 신청 내용" icon={<IconInfoCircle />}>
        <Stack gap={"xs"}>
          {/* <Badge variant="light" color="teal" radius="sm"> */}
          <Group justify="space-between" my={"xs"}>
            <Text fz={"sm"} fw={500}>
              {submitInfo?.leaveInfo[0].leaveType}
            </Text>

            <Text fz={"sm"}>승인자 : {submitInfo?.confirmPerson.label}</Text>
          </Group>
          {/* </Badge> */}

          {submitInfo?.leaveInfo?.map((info: any, key: number) => (
            <Group key={key}>
              <Text fz={"sm"}>{`${dayjs(info?.commuteDate).format("YYYY-MM-DD (dd요일)")} `}</Text>
            </Group>
          ))}
        </Stack>
      </Alert>
      <Group wrap="nowrap" mt={"md"}>
        <Button onClick={submit} fullWidth>
          신청하기
        </Button>
        <Button onClick={close} color="gray.5" fullWidth>
          취소
        </Button>
      </Group>
    </Modal>
  );
}

export default VacationConfirmModal;
