"use client";

import React from "react";
import Breakfast from "../../../../../public/icons/breakfast.svg";
import { Flex } from "@mantine/core";
export const BreakfastIcon = () => {
  return (
    <Flex bg={"blue.0"} justify={"center"} align={"center"} p={4}>
      <Breakfast width={30} height={25} color={"#fdcb67"} />
    </Flex>
  );
};
