"use client";
import { Button, Divider, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import React, { useCallback } from "react";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import { BreakfastIcon } from "../icon/BreakfastIcon";
import { LunchIcon } from "../icon/LunchIcon";
import { DinnerIcon } from "../icon/DinnerIcon";

export const Attend = ({ toggle, values, type }: any) => {
  const renderIcon = useCallback((type: any) => {
    if (type === "breakfast") {
      return <BreakfastIcon />;
    } else if (type === "lunch") {
      return <LunchIcon />;
    } else {
      return <DinnerIcon />;
    }
  }, []);

  return (
    <Button
      justify="space-between"
      fullWidth
      variant="default"
      size="xl"
      onClick={toggle}
      radius="lg"
      rightSection={<ArrowRight color="gray" width={18} />}
      pl={"md"}
    >
      <Group>
        {renderIcon(type)}
        <Flex direction={"column"} align={"flex-start"}>
          <Text size="sm" fw={600} c={"blue.8"}>
            <NumberFormatter thousandSeparator value={values?.amount || 0} />
            <Text component="span" size="sm" ml={2}>
              원
            </Text>
          </Text>
          <Group>
            <Text c={"gray.6"} size="xs">
              {values?.place || ""}
            </Text>
            <Divider size={"xs"} orientation="vertical" />
            <Text c={"gray.6"} size="xs">
              {values?.payerName || ""}
            </Text>
          </Group>
        </Flex>
      </Group>
    </Button>
  );
};
