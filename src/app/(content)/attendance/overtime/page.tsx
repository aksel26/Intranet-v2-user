import PageContainer from "@/components/Global/container";
import { Stack, Text } from "@mantine/core";
import React from "react";

const Overtime = () => {
  return (
    <PageContainer>
      <Stack gap={1}>
        <Text size="lg" fw={600} component="a">
          시간 외 근무
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          시간외 근무 현황 및 신청 페이지입니다.
        </Text>
      </Stack>
    </PageContainer>
  );
};

export default Overtime;
