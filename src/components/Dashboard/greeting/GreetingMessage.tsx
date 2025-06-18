import { myInfoStore } from "@/lib/store/myInfoStore";
import { Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

function GreetingMessage() {
  const { myInfo } = myInfoStore();

  const today = dayjs().format("YYYY년 M월 DD일 dd요일");

  return (
    <Stack mb={"md"} gap={4}>
      <Text>
        <Text fz={"lg"} component="span" fw={500}>
          {myInfo?.userName} {myInfo?.gradeName}
        </Text>
        님, 반가워요!
      </Text>
      <Text size="sm">{`오늘은 ${today} 입니다.`}</Text>
    </Stack>
  );
}

export default GreetingMessage;
