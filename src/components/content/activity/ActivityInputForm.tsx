"use client";
import notification from "@/components/GNB/Notification";
import { useSubmitFormActivity } from "@/hooks/useSubmitForm";
import { Button, Flex, NumberInput, rem, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
dayjs.locale("ko");

interface FormValues {
  targetDay: string;
  amount: number | null;
  content: string | null;
  payerName: string | null;
}

export default function ActivityInputForm({ onClose }: any) {
  const queryClient = useQueryClient();

  const [targetDate, setTargetDate] = useState<Date | null>(null);

  const { mutate } = useSubmitFormActivity();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      amount: null,
      targetDay: "", // Added targetDay
      payerName: "", // Added payerName
    },
  });

  useEffect(() => {
    const value = sessionStorage.getItem("user");
    if (value) {
      const { userName } = JSON.parse(value);

      form.setFieldValue("payerName", userName); // form의 name 필드값을 업데이트
    }
  }, []);

  const handleSubmit = (values: FormValues) => {
    const temp = { ...values };
    temp.targetDay = dayjs(targetDate).format("YYYY-MM-DD");
    mutate(temp, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["qna"] });
        notification({
          title: "활동비",
          color: "green",
          message: "활동비 내역이 저장되었습니다.",
        });
        onClose();
      },
    });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" value={"본인"} disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
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

        <NumberInput
          label="금액"
          placeholder="금액을 입력해 주세요."
          thousandSeparator=","
          hideControls
          suffix=" 원"
          key={form.key("amount")}
          {...form.getInputProps("amount")}
        />

        <Button type="submit" mt={20}>
          저장하기
        </Button>
      </Flex>
    </form>
  );
}
