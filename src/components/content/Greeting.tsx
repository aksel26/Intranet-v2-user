"use client";
import React from "react";
import { ContentWrapper } from "./ContentWrapper";
import { Text } from "@mantine/core";

export const Greeting = () => {
  return (
    <ContentWrapper>
      <Text fw={700}>
        안녕하세요,{" "}
        <Text component="span" fw={700} c={"blue.9"} mr={5}>
          Test
        </Text>
        님
      </Text>
      <Text size={"sm"}>맛점하셨나요 ?</Text>
    </ContentWrapper>
  );
};
