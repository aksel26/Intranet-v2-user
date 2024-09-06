import { ContentWrapper } from "@/components/Global/ContentWrapper";
import { Text } from "@mantine/core";
import React from "react";

export const TopTitle = () => {
  return (
    <ContentWrapper>
      <Text size="xl" fw={700}>
        9월 6일 금요일{" "}
      </Text>
      <Text fw={600}> 복지포인트 조회</Text>
    </ContentWrapper>
  );
};
