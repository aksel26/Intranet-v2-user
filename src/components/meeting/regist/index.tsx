import { userService } from "@/api/services/user/user.services";
import { useApiQuery } from "@/api/useApi";
import { MEETING_TYPES } from "@/lib/enums/meeting/meeting";
import { myInfoStore } from "@/store/myInfoStore";
import type { TUsers } from "@/types/users";
import { formatTimeHHmm, formatYYYYMMDD } from "@/utils/date/format";
import { Badge, Button, Group, Modal, MultiSelect, Paper, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useMemo } from "react";

// Types
interface RegistMeetingProps {
  opened: boolean;
  close: () => void;
  target: any;
}

interface MeetingFormValues {
  title: string;
  meetingType: string;
  attendeeUserIdxs: string[];
  referenceUserIdxs: string[];
  content: string;
}

// Constants

const LABEL_STYLES = {
  label: {
    fontSize: "var(--mantine-font-size-xs)",
    color: "var(--mantine-color-gray-5)",
  },
} as const;

const RegistMeeting = ({ opened, close, target }: RegistMeetingProps) => {
  const { data, isLoading, isError } = useApiQuery(["users"], userService.getAll, { enabled: !!opened });

  const { myInfo } = myInfoStore();

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
      meetingType: "",
      attendeeUserIdxs: [],
      referenceUserIdxs: [],
      content: "",
    },
    validate: {
      title: (value) => (!value?.trim() ? "제목을 입력해주세요" : null),
      meetingType: (value) => (!value ? "회의 유형을 선택해주세요" : null),
      attendeeUserIdxs: (value) => (value.length === 0 ? "참석자를 선택해주세요" : null),
    },
  });

  const handleSubmit = useCallback(
    (values: MeetingFormValues) => {
      console.log("Meeting registration values:", values);
      // TODO: API 호출 로직 구현
      alert("회의실 등록");
      close();
    },
    [close]
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
            key={form.key("referenceUserIdxs")}
            {...form.getInputProps("referenceUserIdxs")}
          />

          <Textarea placeholder="내용을 입력해 주세요." styles={LABEL_STYLES} label="내용" autosize minRows={4} key={form.key("content")} {...form.getInputProps("content")} />

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
