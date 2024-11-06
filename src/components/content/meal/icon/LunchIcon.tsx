"use client";

import React from "react";
import Lunch from "../../../../../public/icons/lunch.svg";
import { Flex } from "@mantine/core";
export const LunchIcon = () => {
  return (
    <Flex bg={"blue.0"} justify={"center"} align={"center"} p={6}>
      <Lunch width={25} height={20} color={"#fdcb67"} />
    </Flex>
  );
};
