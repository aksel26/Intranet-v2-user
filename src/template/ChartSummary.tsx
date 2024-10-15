import DoughnutChart from "@/components/content/meal/DoughnutChart";
import { mealStore } from "@/lib/store/\bmealStore";
import { Flex, NumberFormatter, rem, Text } from "@mantine/core";

export const ChartSummary = () => {
  const { mealBudget, mealExpense, mealBalance } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <>
      <Flex columnGap={"sm"}>
        <Flex p={"xs"} px="md" bg={"blue.0"} direction="column" rowGap={"4px"} w={"70%"}>
          <Flex>
            <Text w="120px">사용가능 금액</Text>
            <NumberFormatter thousandSeparator value={mealBudget} suffix=" 원" />
          </Flex>
          <Flex>
            <Text w="120px">사용한 금액</Text>
            <NumberFormatter thousandSeparator value={mealExpense} suffix=" 원" />
          </Flex>
          <Flex>
            <Text w="120px">남은 금액</Text>
            <NumberFormatter thousandSeparator value={mealBalance} suffix=" 원" />
          </Flex>
        </Flex>
        <Flex p={rem(8)} bg={"blue.0"} w={"30%"} mah={100} justify={"center"}>
          <DoughnutChart />
        </Flex>
      </Flex>
    </>
  );
};
