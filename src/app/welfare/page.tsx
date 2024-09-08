"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { WelfareBalance } from "@/components/content/welfare/WelfareBalance";
import { Container, Flex } from "@mantine/core";

const Main = () => {
  return (
    <Container
      size={"xs"}
      p={0}
      bg="gray.0"
      h={"calc(100vh - 52px)"}
      style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}
    >
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        <WelfareBalance />
        <UsedList />
      </Flex>
    </Container>
  );
};

export default Main;
