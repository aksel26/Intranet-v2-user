import { meetingService } from "@/api/services/meeting/meeting.services";
import { userService } from "@/api/services/user/user.services";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import notification from "@/components/common/notification";
import { MEETING_TIME } from "@/lib/enums/meeting/meeting";
import type { TUsers } from "@/types/users";
import { formatTimeHHmm } from "@/utils/date/format";
import { Button, Group, Modal, MultiSelect, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const UpdateMeeting = ({ opened, close, target }: any) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useApiQuery(["users"], userService.getAll);
  const [users, setUsers] = useState<any>([]);
  const [details, setDetails] = useState<any>();

  const meetingInfoForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      content: "",
      meetingDate: "",
      startTime: "",
      endTime: "",
      meetingType: "",
      roomId: "",
      description: "",
    },
    // validate: {
    //   userCell: (value) => {
    //     if (!value) return "휴대폰 번호를 입력해주세요";
    //     if (value.replace(/-/g, "").length !== 11) {
    //       return "올바른 휴대폰 번호를 입력해주세요";
    //     }
    //     return null;
    //   },
    // },
  });

  useEffect(() => {
    if (data) setUsers(data?.data.data);
  }, [data]);

  useEffect(() => {
    if (target) setDetails((prev: any) => ({ ...prev, room: target?._def?.resourceIds[0] || "", title: target.title, ...target?._def?.extendedProps }));
  }, [target]);

  useEffect(() => {
    const initialValues = {
      title: details?.title,
      content: details?.content || "",
      meetingDate: target?.start,

      startTime: formatTimeHHmm(target?.start),
      endTime: formatTimeHHmm(target?.end),
      meetingType: details?.meetingType,
      roomId: details?.room,
      description: details?.description,
      ccUserIdxs: details?.attendeeInfo.map((attendance: any) => attendance.attendeeIdx.toString()) || [],
      attendeeUserIdxs: details?.ccUserInfo.map((cc: any) => cc.ccUserIdx.toString()) || [],
    };

    meetingInfoForm.setInitialValues(initialValues);
    meetingInfoForm.setValues(initialValues);
  }, [details]);

  const updateMeeting = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(meetingService.updateMeetings, {
    onSuccess: async () => {
      close();
      notification({
        title: "회의실 예약 수정",
        color: "green",
        message: "회의실 내역이 삭제되었습니다.",
      });

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["meeting"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "회의실 취소하기",
        color: "red",
        message: errorMessage,
      });
    },
  });

  const transformValues = (values: any) => {
    const meetingDate = dayjs(values.meetingDate).format("YYYY-MM-DD");

    return {
      title: values.title || "",
      content: values.content || "",
      meetingDate: meetingDate,
      startTime: values.startTime || "",
      endTime: values.endTime || "",
      meetingType: values.meetingType || "",
      roomId: values.roomId || "",
      description: values.description || null,
      attendeeUserIdxs: values.attendeeUserIdxs?.map((idx: string) => Number(idx)) || [],
      ccUserIdxs: values.ccUserIdxs?.map((idx: string) => Number(idx)) || [],
    };
  };

  const submit = (values: any) => {
    // INPUT: form에서 받은 원본 values

    // OUTPUT: API 호출을 위해 변환된 형식
    const transformedValues = transformValues(values);

    updateMeeting.mutate({ body: transformedValues, idx: target?.id });
  };
  return (
    <Modal opened={opened} onClose={close} title="회의 일정 수정" centered size={"md"}>
      <form onSubmit={meetingInfoForm.onSubmit(submit)}>
        <Stack>
          <Stack gap={2}>
            <Text c="gray.5" fz="xs">
              예약자
            </Text>
            <Text fz="sm">{details?.writerName}</Text>
          </Stack>

          <Group wrap="nowrap" align="flex-end">
            <DatePickerInput
              locale="ko"
              highlightToday
              firstDayOfWeek={0}
              clearable
              label="일자"
              placeholder="조회일자를 선택해 주세요."
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-xs",
                  color: "var(--mantine-color-gray-5)",
                },
              }}
              valueFormat="YYYY/MM/DD"
              leftSection={<Calendar size={20} strokeWidth={1.2} />}
              key={meetingInfoForm.key("meetingDate")}
              {...meetingInfoForm.getInputProps("meetingDate")}
            />

            <Select
              data={MEETING_TIME}
              label="시작시간"
              placeholder="시작시간"
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
              styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              key={meetingInfoForm.key("startTime")}
              {...meetingInfoForm.getInputProps("startTime")}
            />
            <Select
              data={MEETING_TIME}
              label="종료시간"
              placeholder="종료시간"
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
              styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              key={meetingInfoForm.key("endTime")}
              {...meetingInfoForm.getInputProps("endTime")}
            />
          </Group>
          <Select
            data={["C", "A", "C2", "G", "L1", "L2", "R", "S1", "S2"]}
            placeholder="회의실을 선택해 주세요."
            label="회의실"
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            key={meetingInfoForm.key("roomId")}
            {...meetingInfoForm.getInputProps("roomId")}
          />
          <TextInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            placeholder="제목을 입력해 주세요."
            label="제목"
            key={meetingInfoForm.key("title")}
            {...meetingInfoForm.getInputProps("title")}
          />
          <Select
            placeholder="회의 유형을 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="회의 유형"
            data={["검사", "면접", "회의", "고객사미팅", "협력사미팅"]}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={meetingInfoForm.key("meetingType")}
            {...meetingInfoForm.getInputProps("meetingType")}
          />

          <MultiSelect
            searchable
            placeholder="참석자를 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="참석자"
            data={users?.map((user: TUsers) => ({
              value: user.userIdx.toString(),
              label: user.userName,
            }))}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={meetingInfoForm.key("attendeeUserIdxs")}
            {...meetingInfoForm.getInputProps("attendeeUserIdxs")}
          />

          <MultiSelect
            searchable
            placeholder="참조자를 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="침조자"
            data={users?.map((user: TUsers) => ({
              value: user.userIdx.toString(),
              label: user.userName,
            }))}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={meetingInfoForm.key("ccUserIdxs")}
            {...meetingInfoForm.getInputProps("ccUserIdxs")}
          />
          <Textarea
            placeholder="내용을 입력해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="내용"
            autosize
            minRows={4}
            key={meetingInfoForm.key("content")}
            {...meetingInfoForm.getInputProps("content")}
          />

          <Group wrap="nowrap">
            <Button fullWidth variant="light" type="submit">
              수정하기
            </Button>
            <Button fullWidth variant="light" color="gray">
              닫기
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default UpdateMeeting;
