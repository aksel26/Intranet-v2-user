"use client";
import { Button, Divider, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import React from "react";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import { BreakfastIcon } from "../icon/BreakfastIcon";
import { LunchIcon } from "../icon/LunchIcon";
import { DinnerIcon } from "../icon/DinnerIcon";

export const Attend = ({ type, toggle, values }: any) => {
  const { data } = values;
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
    <Button
      justify="space-between"
      fullWidth
      variant="outline"
      size="xl"
      onClick={toggle}
      radius="md"
      rightSection={<ArrowRight color="gray" width={18} />}
      pl={"md"}
    >
      <Group>
        {renderIcon(type)}
        <Flex direction={"column"} align={"flex-start"}>
          <Text size="md" fw={700} c={"blue.8"}>
            <NumberFormatter thousandSeparator value={data?.amount || 0} />
            <Text component="span" size="sm" ml={2}>
              원
            </Text>
          </Text>
          <Group>
            <Text c={"gray.6"} size="sm">
              {data?.place || ""}
            </Text>
            <Divider size={"xs"} orientation="vertical" />
            <Text c={"gray.6"} size="sm">
              {data?.payerName || ""}
            </Text>
          </Group>
        </Flex>
      </Group>
    </Button>
  );
};
