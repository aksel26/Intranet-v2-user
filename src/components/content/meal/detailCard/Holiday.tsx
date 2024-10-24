"use client";

import React from "react";
import { Divider, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import IconHoliday from "../../../../../public/icons/holiday.svg";

export const Holiday = () => {
  return (
    <Flex justify={"space-between"} columnGap={"xl"} align={"center"} py={5}>
      <Flex wrap="nowrap" align={"center"} columnGap={"xs"}>
        <Flex bg={"blue.0"} justify={"center"} align={"center"} p={4}>
          <IconHoliday width={30} height={25} color={"#fdcb67"} />
        </Flex>
        <Text size="xs" c={"gray.6"}>
          반차 / 연차일 경우 식대가 제공되지 않습니다.
        </Text>
      </Flex>
      <ArrowRight color="gray" width={18} />
    </Flex>
  );
};
