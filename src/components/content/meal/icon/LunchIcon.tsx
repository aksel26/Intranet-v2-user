"use client";

import React from "react";
import Lunch from "../../../../../public/icons/lunch.svg";
import { Flex } from "@mantine/core";
export const LunchIcon = () => {
  return (
    <Flex bg={"blue.0"} justify={"center"} align={"center"} p={4}>
      <Lunch width={30} height={25} color={"#fdcb67"} />
    </Flex>
  );
};
