"use client";

import { Button, Flex, Text } from "@mantine/core";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import IconHoliday from "../../../../../public/icons/holiday.svg";

export const Holiday = () => {
  return (
    <Button justify="space-between" fullWidth variant="light" size="lg" radius={"md"} color="lime.3" leftSection={<span />}>
      <Text size="sm" c={"lime.8"} fw={600} ta={"center"} style={{ alignSelf: "center" }}>
        반차 또는 휴무날은 식대가 제공되지 않아요.
      </Text>
    </Button>
  );
};
