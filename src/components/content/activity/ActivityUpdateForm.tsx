"use client";
import notification from "@/components/GNB/Notification";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useDeleteActivity, useDeleteWelfares, useUpdateFormActivity, useUpdateFormWelfare } from "@/hooks/useSubmitForm";
import { toggleStore } from "@/lib/store/toggleStore";
import { Button, Flex, Group, NumberInput, Popover, rem, Text, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
dayjs.locale("ko");

interface FormValues {
  amount: number | null;
  content: string | null;
  payerName: string | null;
}

export default function ActivityUpdateForm({ onClose, updateActivityDetail }: any) {
  const queryClient = useQueryClient();
  const { activityIdx, content, amount, payerName } = updateActivityDetail;
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const { toggleInfo } = toggleStore((state) => state);

  const { mutate } = useUpdateFormActivity();
  const { mutate: deleteActivity } = useDeleteActivity();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: content,
      amount: amount,
      payerName: payerName, // Added payerName
    },
  });

  useEffect(() => {
    setTargetDate(dayjs(updateActivityDetail.targetDay).toDate());
  }, [updateActivityDetail]);

  const handleSubmit = (values: FormValues) => {
    const temp = {
      queryParams: activityIdx,
      body: {
        targetDay: dayjs(targetDate).format("YYYY-MM-DD"),
        ...values,
      },
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
    deleteActivity(activityIdx, {
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
          value={targetDate}
          onChange={setTargetDate}
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
