"use client";
import notification from "@/components/GNB/Notification";
import { useSubmitFormActivity } from "@/hooks/useSubmitForm";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { Button, Flex, NumberInput, rem, Text, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconCalendar } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";
dayjs.locale("ko");

interface FormValues {
  targetDay: string | null;
  amount: number | null;
  content: string | null;
  payerName: string | null;
}

export default function ActivityInputForm({ onClose, opened }: any) {
  const queryClient = useQueryClient();

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

    temp.targetDay = dayjs(temp.targetDay).format("YYYY-MM-DD");

    mutate(temp, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["activity"] });
        notification({
          title: "활동비",
          color: "green",
          message: "활동비 내역이 저장되었습니다.",
        });
        form.reset();
        opened && onClose();
      },
      onError: (error: any) => {
        if (error.status === 403) {
          notification({
            title: "활동비",
            color: "red",
            message: "작성 권한이 없습니다.",
          });
        }
      },
    });
  };

  const { myInfo } = myInfoStore();

  if (myInfo.gradeName === "인턴" || myInfo.gradeName === "위원" || myInfo.gradeName === "선임" || myInfo.gradeName === "책임") {
    return (
      <Text fz={"sm"} c={"dimmed"}>
        활동비 입력 권한이 없습니다.
      </Text>
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} rowGap={10}>
        <TextInput label="결제자" value={"본인"} disabled key={form.key("payerName")} {...form.getInputProps("payerName")} />
        <DateInput
          label="일자"
          locale="ko"
          clearable
          leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
          placeholder="사용일자를 선택해 주세요."
          valueFormat="MM월 D일 dddd"
          firstDayOfWeek={0}
          popoverProps={{ withinPortal: false, zIndex: 1001 }}
          key={form.key("targetDay")}
          {...form.getInputProps("targetDay")}
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
