import { noticeService } from "@/api/services/notice/notice.services";
import { userService } from "@/api/services/user/user.services";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import notification from "@/components/common/notification";
import type { TUsers } from "@/types/users";
import {
  Button,
  FileInput,
  Group,
  Loader,
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
//   import { IconCalendar } from "@tabler/icons-react";

const CreateNotice = ({ opened, close }: any) => {
  const { data, isLoading, isError } = useApiQuery(
    ["users"],
    userService.getAll,
    { enabled: !!opened }
  );
  // // const users = data?.data.data;
  const users = data?.data.data;

  // console.log("users:", users);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
      category: "",
      place: null,
      useCar: null,
      ccUserIdxs: [],
      attendeeUserIdxs: [],
      startDate: "",
      endDate: "",
      content: null,
      noticeImage: null,
    },
    validate: {
      title: (value) => (value.length < 1 ? "제목을 입력해 주세요." : null),
      category: (value) =>
        value.length < 1 ? "카테고리를 선택해 주세요." : null,
    },
  });

  const closeModal = () => {
    close();
    form.reset();
  };

  const queryClient = useQueryClient();

  const createNotice = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(noticeService.createNotice, {
    onSuccess: async () => {
      close();
      notification({
        title: "공지사항 등록",
        color: "green",
        message: "공지사항 등록 완료되었습니다.",
      });
      form.reset();

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["notices"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "공지사항 등록",
        color: "red",
        message: errorMessage,
      });
    },
  });

  const submit = (values: any) => {
    const input = { ...values };
    input.startDate = input.date[0];
    input.endDate = input.date[1];
    input.attendeeUserIdxs =
      input.attendeeUserIdxs.length < 1
        ? null
        : input.attendeeUserIdxs.map((user: string) => Number(user));
    input.ccUserIdxs =
      input.ccUserIdxs.length < 1
        ? null
        : input.ccUserIdxs.map((user: string) => Number(user));
    delete input.date;

    createNotice.mutate(input);
  };

  return (
    <Modal opened={opened} onClose={closeModal} title="공지/일정 등록" centered>
      {isLoading ? (
        <Loader />
      ) : (
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
                  fontSize: "var(--mantine-font-size-xs",
                  color: "var(--mantine-color-gray-5)",
                },
              }}
              placeholder="제목을 입력해 주세요."
              label="제목"
              key={form.key("title")}
              {...form.getInputProps("title")}
            />

            <DatePickerInput
              // label="조회기간"
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
                  fontSize: "var(--mantine-font-size-xs",
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
                  fontSize: "var(--mantine-font-size-xs",
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
                  fontSize: "var(--mantine-font-size-xs",
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
                  fontSize: "var(--mantine-font-size-xs",
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
                  fontSize: "var(--mantine-font-size-xs",
                  color: "var(--mantine-color-gray-5)",
                },
              }}
              label="차량 사용"
              data={["미사용", "자가용", "렌트카", "회사차"]}
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
              key={form.key("useCarYN")}
              {...form.getInputProps("useCarYN")}
            />

            <Textarea
              placeholder="내용을 입력해 주세요."
              styles={{
                label: {
                  fontSize: "var(--mantine-font-size-xs",
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
                  fontSize: "var(--mantine-font-size-xs",
                  color: "var(--mantine-color-gray-5)",
                },
              }}
              label="첨부파일"
              key={form.key("noticeImage")}
              {...form.getInputProps("noticeImage")}
            />
            <Button fullWidth type="submit">
              등록하기
            </Button>
          </Stack>
        </form>
      )}
    </Modal>
  );
};

export default CreateNotice;
