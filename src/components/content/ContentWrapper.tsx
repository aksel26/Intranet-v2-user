"use client";

import { Flex } from "@mantine/core";
import React from "react";

export const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="column" bg={"white"} px="md" py="lg" rowGap={"sm"}>
      {children}
    </Flex>
  );
};
