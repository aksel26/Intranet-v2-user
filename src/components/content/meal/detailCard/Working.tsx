"use client";
import { Divider, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import React from "react";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import { BreakfastIcon } from "../icon/BreakfastIcon";
import { LunchIcon } from "../icon/LunchIcon";
import { DinnerIcon } from "../icon/DinnerIcon";
export const Attend = ({ type }: any) => {
  const renderIcon = (type: any) => {
    if (type === "breakfast") {
      return <BreakfastIcon />;
    } else if (type === "lunch") {
      return <LunchIcon />;
    } else {
      return <DinnerIcon />;
    }
  };

  return (
    <Flex justify={"space-between"} columnGap={"xl"} align={"center"}>
      <Flex columnGap={"md"}>
        {renderIcon(type)}
        <Flex direction={"column"} align={"flex-start"}>
          <Text size="md" fw={700}>
            <NumberFormatter thousandSeparator value={113230} />
            <Text component="span" size="sm" ml={2}>
              원
            </Text>
          </Text>
          <Group>
            <Text c={"gray.6"} size="sm">
              식당
            </Text>
            <Divider size={"xs"} orientation="vertical" />
            <Text c={"gray.6"} size="sm">
              결제자
            </Text>
          </Group>
        </Flex>
      </Flex>
      <ArrowRight color="gray" width={18} />
    </Flex>
  );
};
