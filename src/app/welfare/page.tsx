"use client";

import { WelfareBalance } from "@/components/content/welfare/WelfareBalance";
import { TopTitle } from "@/components/content/welfare/TopTitle";
import { Flex } from "@mantine/core";

const Main = () => {
  return (
    <Flex direction={"column"} rowGap={"sm"}>
      <TopTitle />
      <WelfareBalance />
    </Flex>
  );
};

export default Main;
