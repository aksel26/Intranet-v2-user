import { noticeService } from "@/api/services/notice/notice.services";
import { userService } from "@/api/services/user/user.services";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import notification from "@/components/common/notification";
import type { TUsers } from "@/types/users";
import {
  Button,
  FileInput,
  Group,
  Modal,
  MultiSelect,
  Radio,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar } from "lucide-react";
import { useEffect } from "react";

const ModifyNotice = ({ opened, close, details }: any) => {
  console.log("details: ", details);

  const { data, isLoading, isError } = useApiQuery(
    ["users"],
    userService.getAll,
    { enabled: !!opened }
  );
  const users = data?.data.data;

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      category: "",
      place: null,
      useCar: null, // 폼에서는 useCar로 통일
      ccUserIdxs: [],
      attendeeUserIdxs: [],
      startDate: "",
      endDate: "",
      content: null,
      noticeImage: null,
      date: [], // DatePickerInput용 배열
    },
    validate: {
      title: (value) => (value.length < 1 ? "제목을 입력해 주세요." : null),
      category: (value) =>
        value.length < 1 ? "카테고리를 선택해 주세요." : null,
    },
  });

  const queryClient = useQueryClient();

  // 비동기 데이터가 로드되면 폼 초기값 설정
  useEffect(() => {
    if (details) {
      // attendeeInfo와 ccUserInfo를 userIdx 배열로 변환
      const attendeeUserIdxs =
        details.attendeeInfo?.map(
          (user: any) => user.attendeeUserIdx?.toString() || ""
        ) || [];

      const ccUserIdxs =
        details.ccUserInfo?.map(
          (user: any) => user.ccUserIdx?.toString() || ""
        ) || [];

      // DatePickerInput용 날짜 배열 생성
      const dateRange = [
        details.startDate ? new Date(details.startDate) : null,
        details.endDate ? new Date(details.endDate) : null,
      ].filter(Boolean);

      // 폼 초기값 설정
      const formData = {
        title: details.title || "",
        category: details.category || "",
        place: details.place || "",
        useCar: details.useCar || null,
        ccUserIdxs: ccUserIdxs,
        attendeeUserIdxs: attendeeUserIdxs,
        startDate: details.startDate || "",
        endDate: details.endDate || "",
        content: details.content || "",
        noticeImage: null, // 파일은 초기값 설정 불가
        date: dateRange,
      };

      form.setInitialValues(formData);
      form.reset(); // 폼을 초기값으로 리셋
    }
  }, [details]);

  // 모달이 닫힐 때 폼 리셋
  useEffect(() => {
    if (!opened) {
      form.reset();
    }
  }, [opened]);

  const updateNotice = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(noticeService.updateNotice, {
    onSuccess: async () => {
      close();
      notification({
        title: "공지사항 수정",
        color: "green",
        message: "공지사항 수정 완료되었습니다.",
      });
      form.reset();

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = [
            "noticesDetail",
            { noticeIdx: details.noticeIdx },
          ];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "공지사항 수정",
        color: "red",
        message: errorMessage,
      });
    },
  });

  const submit = (values: any) => {
    const input = { ...values };

    // 날짜 정보 처리
    if (input.date && input.date.length > 0) {
      input.startDate =
        input.date[0]?.toISOString?.().split("T")[0] || input.date[0];
      input.endDate =
        input.date[1]?.toISOString?.().split("T")[0] ||
        input.date[1] ||
        input.startDate;
    }

    // 사용자 인덱스 처리
    input.attendeeUserIdxs =
      input.attendeeUserIdxs.length < 1
        ? null
        : input.attendeeUserIdxs.map((user: string) => Number(user));
    input.ccUserIdxs =
      input.ccUserIdxs.length < 1
        ? null
        : input.ccUserIdxs.map((user: string) => Number(user));

    // noticeIdx 추가 (수정 시 필요)
    input.noticeIdx = details?.noticeIdx;

    // 불필요한 필드 제거
    delete input.date;

    // console.log("Submit data:", input); // 디버깅용
    updateNotice.mutate(input);
  };

  if (!details) return null;

  return (
    <Modal opened={opened} onClose={close} title="공지/일정 수정" centered>
      <form onSubmit={form.onSubmit(submit)}>
        <Stack gap={"xs"}>
          <Radio.Group
            styles={{
              error: { marginTop: 6 },
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            key={form.key("category")}
            {...form.getInputProps("category")}
            label="카테고리"
            withAsterisk
          >
            <Group mt={3} gap={"xl"}>
              <Radio
                size="xs"
                styles={{
                  label: { fontSize: "var(--mantine-font-size-sm)" },
                }}
                value="공지사항"
                label="공지사항"
              />
              <Radio
                size="xs"
                styles={{
                  label: { fontSize: "var(--mantine-font-size-sm)" },
                }}
                value="내부미팅"
                label="내부미팅"
              />
              <Radio
                size="xs"
                styles={{
                  label: { fontSize: "var(--mantine-font-size-sm)" },
                }}
                value="외부미팅"
                label="외부미팅"
              />
              <Radio
                size="xs"
                styles={{
                  label: { fontSize: "var(--mantine-font-size-sm)" },
                }}
                value="기타"
                label="기타"
              />
            </Group>
          </Radio.Group>

          <TextInput
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            placeholder="제목을 입력해 주세요."
            label="제목"
            withAsterisk
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <DatePickerInput
            type="range"
            locale="ko"
            highlightToday
            firstDayOfWeek={0}
            clearable
            label="일자 & 시간"
            allowSingleDateInRange
            placeholder="조회일자를 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            valueFormat="YYYY/MM/DD"
            leftSection={<Calendar size={20} strokeWidth={1.2} />}
            key={form.key("date")}
            {...form.getInputProps("date")}
          />

          <TextInput
            placeholder="장소를 입력해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="장소"
            key={form.key("place")}
            {...form.getInputProps("place")}
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
              searchValue: user.userName,
            }))}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("attendeeUserIdxs")}
            {...form.getInputProps("attendeeUserIdxs")}
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
            label="참조"
            data={users?.map((user: TUsers) => ({
              value: user.userIdx.toString(),
              label: user.userName,
              searchValue: user.userName,
            }))}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("ccUserIdxs")}
            {...form.getInputProps("ccUserIdxs")}
          />

          <Select
            placeholder="차량 사용 여부를 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="차량 사용"
            data={["미사용", "자가용", "렌트카", "회사차"]}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
            key={form.key("useCar")}
            {...form.getInputProps("useCar")}
          />

          <Textarea
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="내용"
            autosize
            minRows={4}
            key={form.key("content")}
            {...form.getInputProps("content")}
          />

          <FileInput
            placeholder="첨부파일을 선택해 주세요."
            styles={{
              label: {
                fontSize: "var(--mantine-font-size-xs)",
                color: "var(--mantine-color-gray-5)",
              },
            }}
            label="첨부파일"
            key={form.key("noticeImage")}
            {...form.getInputProps("noticeImage")}
          />

          <Button fullWidth type="submit" loading={updateNotice.isPending}>
            수정하기
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default ModifyNotice;
