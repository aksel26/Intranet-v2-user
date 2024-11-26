import { Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const DateSubText = ({ date }: { date: string }) => {
  const formattedDate = dayjs(date).format("MM월 D일 dddd");

  return (
    <Text c={"dimmed"} size="xs" mt={"xs"}>
      {formattedDate}
    </Text>
  );
};
