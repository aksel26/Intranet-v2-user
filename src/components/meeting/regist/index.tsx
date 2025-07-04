import { meetingService } from "@/api/services/meeting/meeting.services";
import { userService } from "@/api/services/user/user.services";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import notification from "@/components/common/notification";
import { MEETING_TYPES } from "@/lib/enums/meeting/meeting";
import { myInfoStore } from "@/store/myInfoStore";
import type { TUsers } from "@/types/users";
import { formatTimeHHmm, formatYYYYMMDD } from "@/utils/date/format";
import { Badge, Button, Group, Modal, MultiSelect, Paper, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

// Types
interface RegistMeetingProps {
  opened: boolean;
  close: () => void;
  target: any;
}

interface MeetingFormValues {
  title: string;
  content: string;
  meetingDate: string;
  startTime: string;
  endTime: string;
  meetingType: string;
  roomId: string;
  description: string | null;
  ccUserIdxs: number[];
  attendeeUserIdxs: number[];
}

// Constants

const LABEL_STYLES = {
  label: {
    fontSize: "var(--mantine-font-size-xs)",
    color: "var(--mantine-color-gray-5)",
  },
} as const;

const RegistMeeting = ({ opened, close, target }: RegistMeetingProps) => {
  const queryClient = useQueryClient();
  const { myInfo } = myInfoStore();

  const { data, isLoading, isError } = useApiQuery(["users"], userService.getAll, { enabled: !!opened });
  const createMeeting = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(meetingService.createMeeting, {
    onSuccess: async () => {
      notification({
        title: "회의실 예약",
        color: "green",
        message: "회의실 예약이 완료되었습니다.",
      });
      form.reset();
      close();
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
        title: "회의실 예약",
        color: "red",
        message: errorMessage,
      });
    },
  });

  // Memoized user options for MultiSelect
  const userOptions = useMemo(() => {
    const users = data?.data?.data as TUsers[] | undefined;
    return (
      users?.map((user: TUsers) => ({
        value: user.userIdx.toString(),
        label: user.userName,
      })) || []
    );
  }, [data]);

  const form = useForm<MeetingFormValues>({
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
      ccUserIdxs: [],
      attendeeUserIdxs: [],
    },
    validate: {
      title: (value) => (!value?.trim() ? "제목을 입력해주세요" : null),
      meetingType: (value) => (!value ? "회의 유형을 선택해주세요" : null),
      attendeeUserIdxs: (value) => (value.length === 0 ? "참석자를 선택해주세요" : null),
    },
  });

  const handleSubmit = useCallback(
    (values: MeetingFormValues) => {
      const submit = { ...values };

      submit.startTime = target?.start ? formatTimeHHmm(target.start) : "";
      submit.endTime = target?.end ? formatTimeHHmm(target.end) : "";
      submit.meetingDate = target?.start ? formatYYYYMMDD(target.start) : "";
      submit.roomId = target?.resource.id;
      if (submit.description === "") submit.description = null;
      console.log("Meeting registration values:", submit);
      // TODO: API 호출 로직 구현
      // alert("회의실 등록");

      createMeeting.mutate(submit);
    },
    [createMeeting, target]
  );

  const handleClose = useCallback(() => {
    form.reset();
    close();
  }, [form, close]);

  // Loading state
  if (isLoading) {
    return (
      <Modal opened={opened} onClose={close} title="회의 일정 등록" centered size="sm">
        <Text>사용자 정보를 불러오는 중...</Text>
      </Modal>
    );
  }

  // Error state
  if (isError) {
    return (
      <Modal opened={opened} onClose={close} title="회의 일정 등록" centered size="sm">
        <Text c="red">사용자 정보를 불러오는데 실패했습니다.</Text>
        <Group mt="md">
          <Button onClick={close} variant="light" color="gray">
            닫기
          </Button>
        </Group>
      </Modal>
    );
  }

  return (
    <Modal opened={opened} onClose={handleClose} title="회의 일정 등록" centered size="sm">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {/* Meeting Info Display */}
          <Badge radius={"sm"} size="lg">
            {target?.resource?._resource?.extendedProps?.room || "알 수 없음"}
          </Badge>
          <Paper>
            <Group justify="space-between" align="flex-start">
              <Stack gap={2}>
                <Text c="gray.5" fz="xs">
                  예약자
                </Text>
                <Text fz="sm">{myInfo?.userName || "알 수 없음"}</Text>
              </Stack>

              <Stack gap={2}>
                <Text c="gray.5" fz="xs">
                  일자
                </Text>
                <Text fz="sm">{target?.start ? formatYYYYMMDD(target?.start) : "알 수 없음"}</Text>
              </Stack>
              <Stack gap={2}>
                <Text c="gray.5" fz="xs">
                  시간
                </Text>
                <Group gap={3}>
                  <Text fz="sm">{target?.start ? formatTimeHHmm(target?.start) : "알 수 없음"}</Text>~<Text fz="sm">{target?.end ? formatTimeHHmm(target?.end) : "알 수 없음"}</Text>
                </Group>
              </Stack>
            </Group>
          </Paper>

          {/* Form Fields */}
          <TextInput styles={LABEL_STYLES} placeholder="제목을 입력해 주세요." label="제목" required key={form.key("title")} {...form.getInputProps("title")} />

          <Select
            placeholder="회의 유형을 선택해 주세요."
            styles={LABEL_STYLES}
            label="회의 유형"
            data={MEETING_TYPES}
            required
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("meetingType")}
            {...form.getInputProps("meetingType")}
          />

          <MultiSelect
            searchable
            placeholder="참석자를 선택해 주세요."
            styles={LABEL_STYLES}
            label="참석자"
            data={userOptions}
            required
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("attendeeUserIdxs")}
            {...form.getInputProps("attendeeUserIdxs")}
          />

          <MultiSelect
            searchable
            placeholder="참조자를 선택해 주세요."
            styles={LABEL_STYLES}
            label="참조자"
            data={userOptions}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("ccUserIdxs")}
            {...form.getInputProps("ccUserIdxs")}
          />

          <Textarea placeholder="내용을 입력해 주세요." styles={LABEL_STYLES} label="내용" autosize minRows={3} key={form.key("content")} {...form.getInputProps("content")} />

          {/* Action Buttons */}
          <Group grow>
            <Button type="submit" variant="filled">
              등록하기
            </Button>
            <Button variant="light" color="gray" onClick={handleClose}>
              닫기
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};

export default RegistMeeting;
