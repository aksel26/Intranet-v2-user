"use client";

import { MealBalance } from "@/components/content/meal/MealBalance";
import { Greeting } from "@/components/content/meal/Greeting";
import { Detail } from "@/components/detail/Detail";
import { Flex } from "@mantine/core";

const Main = () => {
  return (
    <Flex direction={"column"} rowGap={"sm"}>
      <Greeting />
      <MealBalance />
      <Detail />
    </Flex>
  );
};

export default Main;
