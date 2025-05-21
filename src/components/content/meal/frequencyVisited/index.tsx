import { mealStore } from "@/lib/store/mealStore";
import { countPlaceFrequency } from "@/utils/meal/visitedCount";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";

const VisitedFrequency = () => {
  const meal = mealStore();
  const [result, setResult] = useState<any>([]);
  useEffect(() => {
    if (meal?.mealInfo) setResult(countPlaceFrequency(meal.mealInfo));
  }, [meal]);

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"} w={"100%"} h={"100%"}>
      <Group align="flex-start" mb={"md"} justify="space-between">
        <Title order={5}>자주 방문한 식당</Title>
      </Group>
      {result.length === 0 ? (
        <Text fz={"xs"} c={"dimmed"}>
          방문한 식당이 없습니다.
        </Text>
      ) : (
        <Stack gap={"xs"}>
          {result.map((item: any, index: number) => {
            return (
              <Group key={index} align="center" wrap="nowrap">
                <Title w={10} order={6}>
                  {index + 1}
                </Title>
                <Text fz={"xs"}>{item.place}</Text>
                <Text fz={"xs"}>{item.visited}회</Text>
              </Group>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default VisitedFrequency;
