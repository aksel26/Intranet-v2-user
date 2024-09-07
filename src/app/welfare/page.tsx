"use client";

import { WelfareBalance } from "@/components/content/welfare/WelfareBalance";
import { TopTitle } from "@/components/content/welfare/TopTitle";
import { Flex } from "@mantine/core";
import { UsedList } from "@/components/content/welfare/UsedList";

const Main = () => {
  return (
    <Flex direction={"column"} rowGap={"sm"}>
      <TopTitle />
      <WelfareBalance />
      <UsedList />
    </Flex>
  );
};

export default Main;
