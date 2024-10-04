"use client";
import { Button, Flex, MultiSelect, rem, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar } from "@tabler/icons-react";
import React, { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default function WelfareInputForm() {
  const [value, setValue] = useState<Date | null>(null);

  return (
    <Flex direction={"column"} rowGap={10}>
      <TextInput label="결제자" value={"본인"} disabled />
      <DatePickerInput
        label="일자"
        locale="ko"
        leftSection={<IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        placeholder="사용일자를 선택해 주세요."
        value={value}
        onChange={setValue}
        valueFormat="MM월 D일 dddd"
        popoverProps={{ zIndex: 1001 }}
      />
      <MultiSelect
        styles={{
          dropdown: {
            zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
          },
        }}
        label="동반결제자"
        placeholder="결제한 인원을 선택해 주세요."
        data={["김부각", "하츄핑", "시진핑", "핑핑"]}
        searchable
      />
      <TextInput label="사용처" placeholder="결제하신 곳의 상호명을 입력해 주세요." />
      <TextInput label="금액" placeholder="금액을 입력해 주세요." />
      <Button mt={20}>저장하기</Button>
    </Flex>
  );
}
