"use client";
import { mealStore } from "@/lib/store/\bmealStore";
import { Text } from "@mantine/core";
import { ContentWrapper } from "../../Global/ContentWrapper";

export const Greeting = () => {
  const { userName } = mealStore((state) => state.mealInfo.mealStats);

  return (
    <ContentWrapper>
      <Text fw={700}>
        안녕하세요,{" "}
        <Text component="span" fw={700} c={"blue.9"} mr={5}>
          {userName}
        </Text>
        님
      </Text>
      <Text size={"sm"}>맛점하셨나요 ?</Text>
    </ContentWrapper>
  );
};
