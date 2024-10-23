"use client";

import { ChartSummary } from "@/template/ChartSummary";
import { Group, Image, NumberFormatter, Paper, Stack, Text } from "@mantine/core";
import { mealStore } from "@/lib/store/mealStore";
import NextImage from "next/image";
import myImage from "../../../../public/images/Onigiri.png";

export const MealBalance = () => {
  const { mealBalance, userName } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <Paper radius="lg" p="sm" py={"md"}>
      <Stack>
        <Group
          py={"xs"}
          px="md"
          style={(theme) => ({
            borderRadius: theme.radius.md, // 또는 sm, lg, xl 등
          })}
        >
          <Image component={NextImage} src={myImage} alt="My image" w={"2.3rem"} h={"2.3rem"} />
          <Stack gap={"xs"}>
            <Text fw={700}>
              안녕하세요,
              <Text component="span" fw={700} c={"blue.9"} mr={5}>
                {userName}
              </Text>
              님,
            </Text>
            <Text>
              이번달은
              <Text mx={5} component="span" c={"blue.9"} fw={700} size="xl">
                <NumberFormatter thousandSeparator value={mealBalance || 0} suffix=" 원" />
              </Text>
              남으셨네요!
            </Text>
          </Stack>
        </Group>
        <ChartSummary />
      </Stack>
    </Paper>
  );
};
