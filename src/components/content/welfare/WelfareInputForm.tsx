"use client";
import { Button, Flex, LoadingOverlay, MultiSelect, NumberInput, rem, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useForm } from "@mantine/form";
import { useSubmitFormMeal, useSubmitFormWelfare } from "@/hooks/useSubmitForm";
import { useQueryClient } from "@tanstack/react-query";
import notification from "@/components/GNB/Notification";
dayjs.locale("ko");

interface FormValues {
  targetDay: string;
  amount: number | null;
  content: string | null;
  payerName: string | null;
  payeeIdxs: number[] | null;
  selfWrittenYN: string;
}

export default function WelfareInputForm({ onClose }: any) {
  const { data: userList, isLoading, isError } = useGetUsers();
  const [users, setUsers] = useState<any>([]);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [selectedPayee, setSelectedPayee] = useState([]);

  const selectPayee = (e: any) => {
    setSelectedPayee(e);
  };

  const { mutate } = useSubmitFormWelfare();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      selfWrittenYN: "Y",
      content: "",
      amount: null,
      targetDay: "", // Added targetDay
      payerName: "", // Added payerName
      payeeIdxs: [], // Added payeeIdxs
    },
  });
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    setUsers(userList?.data.data.filter((user: any) => user.userName !== currentUser));
  }, [userList]);

  useEffect(() => {
    const value = sessionStorage.getItem("user");
    if (value) {
      const { userName } = JSON.parse(value);
      setCurrentUser(userName);

      form.setFieldValue("payerName", userName); // form의 name 필드값을 업데이트
    }
  }, []);
  const queryClient = useQueryClient();

  const handleSubmit = (values: FormValues) => {
    const payeeIdxs = selectedPayee.map((item: any) => item.userIdx);
    console.log(values, payeeIdxs);

    const temp = { ...values };

    temp.payeeIdxs = payeeIdxs;
    temp.targetDay = dayjs(targetDate).format("YYYY-MM-DD");
    console.log("👀", temp);
    mutate(temp, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["welfares"] });
        notification({
          title: "복지포인트",
          color: "green",
          message: "복지포인트 내역이 저장되었습니다.",
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
            placeholder="결제한 인원을 선택해 주세요."
            data={users?.map((user: any) => ({
              value: user.userIdx.toString(),
              label: user.userName,
              searchValue: user.userName,
            }))}
            onChange={(values) => {
              const selectedUsers = users?.filter((user: any) => values.includes(user.userIdx.toString()));
              selectPayee(selectedUsers);
            }}
            searchable
          />
        )}
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
