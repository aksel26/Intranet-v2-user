import { Stack, Text } from "@mantine/core";
import React from "react";

function InTimeCheckOut() {
  return (
    <Stack>
      <Text>오늘도 수고하셨습니다. 🎉 </Text>
      <Text c={"dimmed"} fz={"sm"} mt={"md"}>
        아래 버튼을 눌러 퇴근을 완료해 주세요.
      </Text>
    </Stack>
  );
}

export default InTimeCheckOut;
