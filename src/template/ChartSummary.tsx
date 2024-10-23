"use client";
import DoughnutChart from "@/components/content/meal/DoughnutChart";
import { mealStore } from "@/lib/store/mealStore";
import { Flex, NumberFormatter, rem, Text } from "@mantine/core";

export const ChartSummary = () => {
  const { mealBudget, mealExpense, mealBalance } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <>
      <Flex columnGap={"sm"}>
        <Flex p={"xs"} px="md" direction="column" rowGap={"4px"} w={"70%"}>
          <Flex>
            <Text c={"gray.6"} w="120px">
              사용가능 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={mealBudget} suffix=" 원" />
            </Text>
          </Flex>
          <Flex>
            <Text c={"gray.6"} w="120px">
              사용한 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={mealExpense} suffix=" 원" />
            </Text>
          </Flex>
          <Flex>
            <Text c={"gray.6"} w="120px">
              남은 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={mealBalance} suffix=" 원" />
            </Text>
          </Flex>
        </Flex>
        <Flex p={rem(8)} w={"30%"} mah={100} justify={"center"}>
          <DoughnutChart />
        </Flex>
      </Flex>
    </>
  );
};
