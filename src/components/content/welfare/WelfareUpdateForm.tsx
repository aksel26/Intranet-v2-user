// "use client";
import notification from "@/components/GNB/Notification";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useDeleteWelfares, useUpdateFormWelfare } from "@/hooks/useSubmitForm";
import { TUsers } from "@/lib/types/users";
import { TPayeeList, TWelfare } from "@/lib/types/welfare";
import { Button, Flex, Group, LoadingOverlay, MultiSelect, NumberInput, Popover, rem, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect } from "react";
dayjs.locale("ko");

interface TFormValues {
  selfWrittenYN: string;
  targetDay: Date | string | null;
  amount: number | null;
  content: string | null;
  payerName: string;
  payeeList: string[];
}

type TUpdateForm = {
  opened: boolean;
  onClose: () => void;
  updateWelfareDetail: TWelfare;
};

export default function WelfareUpdateForm({ opened, onClose, updateWelfareDetail }: TUpdateForm) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useGetUsers();

  // const { toggleInfo } = toggleStore((state) => state);

  const users = data?.data.data;

  const { mutate } = useUpdateFormWelfare();
  const { mutate: deleteWelfare } = useDeleteWelfares();

  const form = useForm<TFormValues>({
    mode: "uncontrolled",
    initialValues: {
      selfWrittenYN: "",
      targetDay: null,
      content: "",
      amount: null as number | null,
      payerName: "",
      payeeList: [],
    },
  });

  useEffect(() => {
    const initialValues: TFormValues = {
      selfWrittenYN: updateWelfareDetail.selfWrittenYN || "",
      targetDay: dayjs(updateWelfareDetail.targetDay).toDate() || dayjs().toDate(),
      content: updateWelfareDetail.content || "",
      amount: updateWelfareDetail.amount as number | null,
      payerName: updateWelfareDetail.payerName as string,
      payeeList: updateWelfareDetail.payeeList.map((list: TPayeeList) => list.userIdx.toString()) || [],
    };

    form.setInitialValues(initialValues);
    form.setValues(initialValues);
  }, [updateWelfareDetail]);

  const handleSubmit = (values: TFormValues) => {
    type TSubmitValues = Omit<TFormValues, "payeeList"> & { payeeIdxs: number[] };

    const submit: TSubmitValues = {
      selfWrittenYN: values.selfWrittenYN,
      targetDay: dayjs(values.targetDay).format("YYYY-MM-DD"),
      amount: values.amount,
      content: values.content,
      payerName: values.payerName,
      payeeIdxs: values.payeeList.map((payee: string) => Number(payee)),
    };

    mutate(
      { body: submit, queryParams: updateWelfareDetail.welfareIdx },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["welfares"] });
          notification({
            title: "복지포인트",
            color: "green",
            message: "복지포인트 내역이 수정되었습니다.",
          });
          onClose();
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<{ message: string }>;
          const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
          notification({ title: "복지포인트 입력", color: "red", message: errorMessage });
        },
      }
    );
  };

  const handleDeleteWelfare = () => {
    deleteWelfare(updateWelfareDetail.welfareIdx, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["welfares"] });
        notification({
          title: "복지포인트",
          color: "green",
          message: "복지포인트 내역이 삭제되었습니다.",
        });
        onClose();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
        notification({ title: "복지포인트 입력", color: "red", message: errorMessage });
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
        <DatePickerInput
          label="일자"
          locale="ko"
          leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          placeholder="사용일자를 선택해 주세요."
          key={form.key("targetDay")}
          {...form.getInputProps("targetDay")}
          valueFormat="MM월 DD일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
        />
        {isLoading ? (
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        ) : (
          <MultiSelect
            styles={{
              dropdown: {
                zIndex: 1001,
              },
            }}
            label="동반결제자"
            data={users?.map((user: TUsers) => ({
              value: user.userIdx.toString(),
              label: user.userName,
              searchValue: user.userName,
            }))}
            key={form.key("payeeList")}
            {...form.getInputProps("payeeList")}
            searchable
          />
        )}
        <TextInput label="사용처" placeholder="결제하신 곳의 상호명을 입력해 주세요." key={form.key("content")} {...form.getInputProps("content")} />

        <Popover
          shadow="lg"
          radius={"lg"}
          arrowPosition="side"
          arrowOffset={9}
          arrowSize={10}
          arrowRadius={1}
          width={170}
          withArrow
          opened={opened}
          position="top-end"
        >
          <Popover.Target>
            <NumberInput
              label="금액"
              placeholder="금액을 입력해 주세요."
              thousandSeparator=","
              hideControls
              suffix=" 원"
              key={form.key("amount")}
              {...form.getInputProps("amount")}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="xs">
              결제자 본인이 아닌 경우, <br />
              <Text component="span" fw={900}>
                금액
              </Text>
              만 수정할 수 있어요.
            </Text>
          </Popover.Dropdown>
        </Popover>
        <Group wrap="nowrap">
          <Button fullWidth type="submit" mt={20}>
            수정하기
          </Button>
          <Button fullWidth type="button" mt={20} color="red" variant="light" onClick={handleDeleteWelfare}>
            삭제하기
          </Button>
        </Group>
      </Flex>
    </form>
  );
}
