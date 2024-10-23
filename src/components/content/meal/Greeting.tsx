"use client";
import { mealStore } from "@/lib/store/mealStore";
import { Paper, Text } from "@mantine/core";

export const Greeting = () => {
  const { userName } = mealStore((state) => state.mealInfo.mealStats);

  return (
    <Paper py="xl" px={"sm"}>
      <Text fw={700}>
        안녕하세요,{" "}
        <Text component="span" fw={700} c={"blue.9"} mr={5}>
          {userName}
        </Text>
        님
      </Text>
      <Text size={"sm"}>맛점하셨나요 ?</Text>
    </Paper>
  );
};
