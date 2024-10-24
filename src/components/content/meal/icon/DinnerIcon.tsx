"use client";

import React from "react";
import Dinner from "../../../../../public/icons/dinner.svg";
import { Flex } from "@mantine/core";
export const DinnerIcon = () => {
  return (
    <Flex bg={"blue.0"} justify={"center"} align={"center"} p={4}>
      <Dinner width={30} height={25} color={"#fdcb67"} />
    </Flex>
  );
};
