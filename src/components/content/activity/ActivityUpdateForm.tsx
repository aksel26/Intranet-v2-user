import notification from "@/components/GNB/Notification";
import { useDeleteActivity, useUpdateFormActivity } from "@/hooks/useSubmitForm";
import { toggleStore } from "@/lib/store/toggleStore";
import { TActivityDetail } from "@/lib/types/activity";
import { Button, Flex, Group, NumberInput, Popover, rem, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect } from "react";
dayjs.locale("ko");

interface TFormValues {
  amount: number | null;
  content: string | null;
  payerName: string | null;
  targetDay: string | Date;
}

type TUpdateForm = {
  onClose: () => void;
  updateActivityDetail: TActivityDetail;
};

export default function ActivityUpdateForm({ onClose, updateActivityDetail }: TUpdateForm) {
  const queryClient = useQueryClient();
  const { toggleInfo } = toggleStore((state) => state);

  const { mutate } = useUpdateFormActivity();
  const { mutate: deleteActivity } = useDeleteActivity();

  const form = useForm<TFormValues>({
    mode: "uncontrolled",
    initialValues: {
      targetDay: dayjs().toDate(),
      content: null,
      amount: null,
      payerName: null,
    },
  });

  useEffect(() => {
    const initialValues: TFormValues = {
      targetDay: dayjs(updateActivityDetail.targetDay).toDate(),
      content: updateActivityDetail.content,
      amount: updateActivityDetail.amount,
      payerName: updateActivityDetail.payerName,
    };

    form.setInitialValues(initialValues);
    form.setValues(initialValues);
  }, [updateActivityDetail]);

  const handleSubmit = (values: TFormValues) => {
    const inputValues = { ...values };
    inputValues.targetDay = dayjs(values.targetDay).format("YYYY-MM-DD");

    const temp = {
      queryParams: updateActivityDetail.activityIdx,
      body: inputValues,
    };
    mutate(temp, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["activity"] });
        notification({
          title: "활동비",
          color: "green",
          message: "활동비 내역이 수정되었습니다.",
        });
        onClose();
      },
    });
  };

  const handleDeleteWelfare = () => {
    deleteActivity(updateActivityDetail.activityIdx, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["activity"] });
        notification({
          title: "활동비",
          color: "green",
          message: "활동비 내역이 삭제되었습니다.",
        });
        onClose();
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
          valueFormat="MM월 D일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
        />

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
          opened={toggleInfo.isOpen}
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
