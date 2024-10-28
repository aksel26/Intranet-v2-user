import { ContentWrapper } from "@/components/Global/ContentWrapper";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

export const TopTitle = () => {
  return (
    <ContentWrapper>
      <Text size="lg" fw={700}>
        {dayjs().format("MM월 DD일 dddd")}
      </Text>
      <Text fw={600}> 복지포인트 조회</Text>
    </ContentWrapper>
  );
};
