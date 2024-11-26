import { Flex } from "@mantine/core";
import React from "react";

export const ListWrapper = ({ children }: { children: any }) => {
  return (
    <Flex w={"100%"} direction={"column"} pb={"md"} gap={"sm"}>
      {children}
    </Flex>
  );
};
