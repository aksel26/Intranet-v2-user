"use client";
import { Button, Flex, LoadingOverlay, MultiSelect, rem, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useForm } from "@mantine/form";
dayjs.locale("ko");

export default function WelfareInputForm() {
  const { data: userList, isLoading, isError } = useGetUsers();
  const [users, setUsers] = useState<any>([]);
  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [selectedPayee, setSelectedPayee] = useState([]);

  const selectPayee = (e: any) => {
    setSelectedPayee(e);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      selfWrittenYN: "",
      content: "",
      amount: null,
    },
  });
  useEffect(() => {
    setUsers(userList?.data.data);
  }, [userList]);
  const submitForm = (values: any) => {
    const payeeIdxs = selectedPayee.map((item: any) => item.userIdx);

    return {};
  };

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
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
          popoverProps={{ zIndex: 1001 }}
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
        <TextInput label="금액" placeholder="금액을 입력해 주세요." key={form.key("amount")} {...form.getInputProps("amount")} />
        <Button type="submit" mt={20}>
          저장하기
        </Button>
      </Flex>
    </form>
  );
}
