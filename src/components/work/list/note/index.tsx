import { attendanceService } from "@/api/services/attendance/attendance.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
import { formatYYYYMMDD } from "@/utils/date/format";
import { Badge, Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

const UpdateNote = ({ opened, close, details }: any) => {
  const queyrClient = useQueryClient();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      note: "",
      earlyLeaveReason: "",
      updateReason: "",
    },
  });

  useEffect(() => {
    form.setInitialValues({ note: details?.note, earlyLeaveReason: details?.earlyLeaveReason, updateReason: details?.updateReason });
    form.setValues({ note: details?.note, earlyLeaveReason: details?.earlyLeaveReason, updateReason: details?.updateReason });
  }, [details]);

  const updateAttendanceNote = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(attendanceService.updateAttendanceNote, {
    invalidateKeys: [["attendanceAllStaff", "vacationSummary", "approvals", "approvalNew", "vacationAll"]],
    onSuccess: async () => {
      await queyrClient.invalidateQueries({ queryKey: ["attendanceAll"] });
      notification({
        color: "green",
        title: "특이사항 수정",
        message: "특이사항이 수정되었습니다.",
      });
      close();
      form.reset();
    },
    onError: (error) => {
      notification({
        color: "red",
        title: "특이사항 수정",
        message: "특이사항 수정에 실패하였습니다.",
      });
    },
  });

  const modifyNote = async (value: any) => {
    updateAttendanceNote.mutate({ body: value, commuteIdx: details.commuteIdx });
  };
  return (
    <Modal opened={opened} onClose={close} title="비고 작성">
      <form onSubmit={form.onSubmit((values) => modifyNote(values))}>
        <Stack gap={"xs"} mb={"md"}>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"sm"} w={60}>
              대상 날짜
            </Text>
            <Text fz={"sm"}>{formatYYYYMMDD(details?.commuteDate)}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"sm"} w={60}>
              출근 현황
            </Text>
            {details?.attendance ? (
              <Text fz={"sm"}>{details?.attendance}</Text>
            ) : (
              <Text fz={"sm"} c="gray">
                출근 현황 정보가 없습니다.
              </Text>
            )}
          </Group>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"sm"} w={60}>
              근태 정보
            </Text>

            {details?.leave.length > 0 ? (
              details?.leave.map((leave: any, index: number) => (
                <Badge key={index} radius={"sm"} variant="light">
                  {leave.leaveType}
                </Badge>
              ))
            ) : (
              <Text fz={"sm"} c="gray">
                근태 정보가 없습니다.
              </Text>
            )}
          </Group>
        </Stack>

        <Stack gap={"md"} mb={"md"}>
          <TextInput
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            key={form.key("note")}
            {...form.getInputProps("note")}
            label="특이사항 입력"
            placeholder="특이사항 내용을 입력해 주세요."
          />
          <TextInput
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            key={form.key("updateReason")}
            {...form.getInputProps("updateReason")}
            label="근태 수정 사유 입력"
            placeholder="근태 수정 사유를 입력해 주세요."
          />
          <TextInput
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            key={form.key("earlyLeaveReason")}
            {...form.getInputProps("earlyLeaveReason")}
            label="조기퇴근 사유 입력"
            placeholder="조기퇴근 사유를 입력해 주세요."
          />
        </Stack>

        <Group wrap="nowrap">
          <Button fullWidth size="sm" type="submit">
            수정
          </Button>
          <Button fullWidth size="sm" color="gray" onClick={close} variant="light">
            닫기
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default UpdateNote;
