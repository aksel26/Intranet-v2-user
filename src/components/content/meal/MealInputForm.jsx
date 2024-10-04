"use client";
import { Button, Flex, TextInput } from "@mantine/core";
import React from "react";

export default function MealInputForm() {
  return (
    <Flex direction={"column"} rowGap={10} py={"md"}>
      <TextInput label="결제자" placeholder="OOO 위원님 결제 또는 직접결제" />
      <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
      <TextInput label="금액" placeholder="금액을 입력해 주세요." />
      <TextInput label="근태" placeholder="Custom layout" />
      <Button mt={20}>저장하기</Button>
    </Flex>
  );
}
