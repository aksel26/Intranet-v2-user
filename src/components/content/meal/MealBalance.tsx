"use client";

import { mealStore } from "@/lib/store/mealStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Box, Flex, Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
export const MealBalance = () => {
  const [statsInfo, setStatsInfo] = useState<any>({
    balance: 0,
    budget: 0,
    expenses: 0,
  });
  const stats = mealStore((state) => state.mealInfo.mealStats);

  useEffect(() => {
    setStatsInfo((prev: any) => ({ ...prev, balance: stats.mealBalance, budget: stats.mealBudget, expenses: stats.mealExpense }));
  }, [stats]);

  return (
    <Flex direction={"column"} bg={"white"} px="md" py="lg" rowGap={"md"}>
      <Box>
        <Text size="xl" fw={700}>
          식대
        </Text>
        <Text size="sm" fw={500} c={"gray.6"}>
          {dayjs().format("MM월 DD일 dddd")}
        </Text>
      </Box>
      <Box>
        <Flex direction={"column"}>
          <Text fw={700} c={"blue.9"}>
            {stats.userName}{" "}
            <Text c={"gray.9"} component="span" mr={0}>
              님의 잔여 식대는
            </Text>
          </Text>

          <Flex align={"center"}>
            <Text mx={5} component="span" c={"blue.9"} fw={700} size="xl">
              <NumberFlow
                value={Number(stats.mealBalance) || 0}
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
