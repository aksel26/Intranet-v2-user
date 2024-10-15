"use client";

import { MealBalance } from "@/components/content/meal/MealBalance";
import { Greeting } from "@/components/content/meal/Greeting";
import { Detail } from "@/components/detail/Detail";
import { Button, Container, Flex } from "@mantine/core";
import { useGetMeals } from "@/hooks/useMeals";
import { useEffect, useState } from "react";
import { useCombinedStore } from "@/lib/store/CombinedSotre";
import { mealStateStore } from "@/lib/store/\bmealStore";

interface mealState {
  count: number;
  increment: () => void;
}

const Main = () => {
  const params = {
    year: 2024,
    month: 10,
  };

  const { data: mealInfo, isLoading, error } = useGetMeals(params);
  const { store1 } = useCombinedStore() as { store1: mealStateStore };
  console.log("🚀 ~ Main ~ data:", mealInfo);
  useEffect(() => {
    if (mealInfo) {
      const result = mealInfo.data.data;
      store1.setMealInfo(result);
    }
  }, [mealInfo]);

  return (
    <Container size={"xs"} p={0} bg="gray.0" h={"calc(100vh - 52px)"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <Greeting />
        <MealBalance />
        <Detail />
      </Flex>
    </Container>
  );
};

export default Main;
