"use client";

import React from "react";
import Breakfast from "../../../../../public/icons/breakfast.svg";
import { Flex } from "@mantine/core";
export const BreakfastIcon = () => {
  return (
    <Flex bg={"yellow.0"} justify={"center"} align={"center"} p={6}>
      <Breakfast width={25} height={20} color={"#fcc419"} />
    </Flex>
  );
};
