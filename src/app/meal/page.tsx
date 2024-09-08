"use client";

import { MealBalance } from "@/components/content/meal/MealBalance";
import { Greeting } from "@/components/content/meal/Greeting";
import { Detail } from "@/components/detail/Detail";
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
        <Greeting />
        <MealBalance />
        <Detail />
      </Flex>
    </Container>
  );
};

export default Main;
