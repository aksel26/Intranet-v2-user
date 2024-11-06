"use client";

import React from "react";
import Dinner from "../../../../../public/icons/dinner.svg";
import { Flex } from "@mantine/core";
export const DinnerIcon = () => {
  return (
    <Flex bg={"violet.0"} justify={"center"} align={"center"} p={6}>
      <Dinner width={25} height={20} color={"#9775fa"} />
    </Flex>
  );
};
