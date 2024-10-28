"use client";

import { mealStore } from "@/lib/store/mealStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Group, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

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
    <Paper radius="lg" p="sm" py={"md"}>
      <Stack gap={0}>
        <Group
          py={"xs"}
          px="md"
          style={(theme) => ({
            borderRadius: theme.radius.md, // 또는 sm, lg, xl 등
          })}
        >
          <Stack gap={0}>
            <Text fw={700}>
              안녕하세요,
              <Text component="span" fw={700} c={"blue.9"} mr={5}>
                {stats.userName}
              </Text>
              님,
            </Text>
            <Text>
              이번달은
              <Text mx={5} component="span" c={"blue.9"} fw={700} size="xl">
                <NumberFormatter thousandSeparator value={stats.mealBalance || 0} suffix=" 원" />
              </Text>
              남으셨네요!
            </Text>
          </Stack>
        </Group>
        <ChartSummary stats={statsInfo} />
      </Stack>
    </Paper>
  );
};
