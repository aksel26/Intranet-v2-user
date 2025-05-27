import { updateAttendanceNote } from "@/app/api/post/postApi";
import notification from "@/components/GNB/Notification";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Button, Group, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

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

  const { mutate } = useMutation({
    mutationFn: (values: any) => updateAttendanceNote(values),
  });

  const modifyNote = async (value: any) => {
    mutate(
      { body: value, commuteIdx: details.commuteIdx },
      {
        onError: (error) => {
          notification({
            color: "red",
            title: "특이사항 수정",
            message: "특이사항 수정에 실패하였습니다.",
          });
        },
        onSuccess: async (data) => {
          await queyrClient.invalidateQueries({ queryKey: ["attendanceAll"] });
          notification({
            color: "green",
            title: "특이사항 수정",
            message: "특이사항이 수정되었습니다.",
          });
          close();
          form.reset();
        },
      }
    );
  };
  return (
    <Modal opened={opened} onClose={close} title="비고 작성">
      <form onSubmit={form.onSubmit((values) => modifyNote(values))}>
        <Stack gap={3} mb={"md"}>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"xs"} w={60}>
              대상 날짜
            </Text>
            <Text fw={500} fz={"xs"}>
              {formatYYYYMMDD(details?.commuteDate)}
            </Text>
          </Group>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"xs"} w={60}>
              근태
            </Text>
            <Text fw={500} fz={"xs"}>
              {details?.leaveType}{" "}
            </Text>
          </Group>
          <Group gap={"xs"}>
            <Text c={"dimmed"} fz={"xs"} w={60}>
              현황
            </Text>
            <Text fw={500} fz={"xs"}>
              {details?.attendance}{" "}
            </Text>
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
