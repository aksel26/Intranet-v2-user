"use client";
import ChartComponent from "@/components/content/meal/DoughnutChart";
import { Flex, NumberFormatter, rem, Text } from "@mantine/core";

const PriceInfo = ({ text, price }: { text: string; price: number | string | undefined }) => {
  return (
    <Flex>
      <Text c={"gray.6"} w="120px" size="sm">
        {text}
      </Text>
      <Text component="span" c={"gray.6"} size="sm">
        <NumberFormatter thousandSeparator value={price} suffix=" 원" />
      </Text>
    </Flex>
  );
};

export const ChartSummary = ({ statsInfo }: any) => {
  const { balance, budget, expenses } = statsInfo;
  // const { mealBudget, mealExpense, mealBalance } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <>
      <Flex columnGap={"sm"}>
        <Flex p={"xs"} px="md" direction="column" rowGap={"4px"} w={"70%"}>
          <PriceInfo text="사용가능 금액" price={budget} />
          <PriceInfo text="사용한 금액" price={expenses} />
          <PriceInfo text="남은 금액" price={balance} />
        </Flex>
        <Flex p={rem(8)} w={"30%"} mah={100} justify={"center"}>
          <ChartComponent stats={statsInfo} />
        </Flex>
      </Flex>
    </>
  );
};
