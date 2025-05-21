import { Badge, Box, Group, NumberFormatter, Paper, Stack, Text, Title } from "@mantine/core";
import React, { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const LunchStats = ({ mealStats }: any) => {
  if (!mealStats) return null;
  const { mealBalance, mealBudget, mealExpense } = mealStats;
  const chartData = useMemo(() => {
    const usagePercentage = (mealExpense / mealBudget) * 100;
    if (usagePercentage <= 100) {
      // 예산 내 사용
      return [
        { name: "사용금액", value: mealExpense },
        { name: "잔여금액", value: mealBalance },
      ];
    } else {
      // 예산 초과
      return [{ name: "예산금액", value: mealBudget }];
    }
  }, [mealStats]);
  const chartColor = useMemo(() => {
    return (entry: any) => {
      if (entry.name === "사용금액") return "#1964AB";
      if (entry.name === "잔여금액") return "#E0E0E0";
      if (entry.name === "예산금액") return "#c92b2a";
    };
  }, []);

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"} w={"100%"}>
      <Group align="flex-start" mb={"md"} justify="space-between">
        <Title order={5}>식대 사용금액 현황</Title>
      </Group>

      <Stack gap={"xs"} justify="center" align="center" pos={"relative"} mx={"auto"}>
        <Badge pos={"absolute"} right={"10%"} top={0} size="xs" variant="dot" color="#1964AB" styles={{ root: { border: "none" }, label: { fontWeight: 400 } }}>
          사용금액
        </Badge>
        <ResponsiveContainer height={100}>
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={40}
              outerRadius={48}
              paddingAngle={5}
              dataKey="value"
              cornerRadius={10} // 각 영역의 모서리를 둥글게 만듭니다
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColor(entry)} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Group>
          <Stack gap={1}>
            <Text c={"gray"} fz={"xs"}>
              총 금액
            </Text>
            <NumberFormatter value={mealBudget} thousandSeparator style={{ fontSize: "var(--mantine-font-size-xs)" }} />
          </Stack>
          <Text>-</Text>
          <Stack gap={1}>
            <Text c={"gray"} fz={"xs"}>
              사용금액
            </Text>
            <NumberFormatter value={mealExpense} thousandSeparator style={{ fontSize: "var(--mantine-font-size-xs)" }} />
          </Stack>
          <Text>=</Text>
          <Stack gap={1}>
            <Text c={"gray"} fz={"xs"}>
              남은금액
            </Text>
            <NumberFormatter value={mealBalance} thousandSeparator style={{ fontSize: "var(--mantine-font-size-xs)" }} />
          </Stack>
        </Group>
      </Stack>
    </Paper>
  );
};

export default LunchStats;
