"use client";

import { Content } from "@/components/content/Content";
import { Greeting } from "@/components/content/Greeting";
import { Detail } from "@/components/detail/Detail";
import { Flex } from "@mantine/core";

const Main = () => {
  return (
    <Flex direction={"column"} rowGap={"sm"}>
      <Greeting />
      <Content />
      <Detail/>
    </Flex>
  );
};

export default Main;
