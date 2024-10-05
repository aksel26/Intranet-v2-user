"use client";
import { Button, Flex, Select, TextInput } from "@mantine/core";
import React from "react";

export default function MealInputForm() {
  return (
    <Flex direction={"column"} rowGap={10} py={"md"}>
      <Select
        label="결제자"
        placeholder="결제자를 선택해 주세요."
        data={["React", "Angular", "Vue", "Svelte"]}
        searchable
        styles={{
          dropdown: {
            zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
          },
        }}
      />

      <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." />
      <TextInput label="금액" placeholder="금액을 입력해 주세요." />
      <Select
        label="근태"
        placeholder="근태 유형을 선택해 주세요."
        data={["근무", "반차", "휴가", "재택근무"]}
        styles={{
          dropdown: {
            zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
          },
        }}
      />
      <Button mt={20}>저장하기</Button>
    </Flex>
  );
}
