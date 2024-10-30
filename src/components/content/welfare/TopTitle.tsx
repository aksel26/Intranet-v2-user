import { ContentWrapper } from "@/components/Global/ContentWrapper";
import { welfareStore } from "@/lib/store/welfareStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Box, Flex, Group, Stack, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export const TopTitle = () => {
  const welfareStats = welfareStore((state) => state.welfareInfo.welfareStats);
  console.log("🚀 ~ TopTitle ~ welfareStats:", welfareStats);
  const [statsInfo, setStatsInfo] = useState<any>({
    balance: 0,
    budget: 0,
    expenses: 0,
  });
  useEffect(() => {
    setStatsInfo((prev: any) => ({ ...prev, balance: welfareStats.welfareBalance, budget: welfareStats.welfareBudget, expenses: welfareStats.welfareExpense }));
  }, [welfareStats]);
  return (
    // <ContentWrapper>
    <Flex direction={"column"} bg={"white"} px="md" py="lg" rowGap={"md"}>
      <Box>
        <Text size="xl" fw={700}>
          복지포인트
        </Text>
        <Text size="sm" fw={500} c={"gray.6"}>
          {dayjs().format("MM월 DD일 dddd")}
        </Text>
      </Box>
      <Box>
        <Flex direction={"column"}>
          <Text fw={700} c={"blue.9"}>
            {welfareStats.userName}{" "}
            <Text c={"gray.9"} component="span" mr={0}>
              님의 잔여 복지포인트는
            </Text>
          </Text>

          <Flex align={"center"}>
            <Text mx={5} component="span" c={"blue.9"} fw={700} size="xl">
              <NumberFlow
                value={230000}
                // value={Number(welfareStats.welfareBalance) || 0}
                locales="ko-KR" // Intl.NumberFormat locales
              />
            </Text>
            <Text>원 입니다</Text>
          </Flex>
        </Flex>
      </Box>
      <ChartSummary stats={statsInfo} />
    </Flex>
  );
};
