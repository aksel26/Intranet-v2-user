"use client";
import ChartComponent from "@/components/content/meal/DoughnutChart";
import { Flex, NumberFormatter, rem, Text } from "@mantine/core";

export const ChartSummary = ({ stats }: any) => {
  const { budget, expenses, balance } = stats;

  return (
    <>
      <Flex columnGap={"sm"}>
        <Flex py={"xs"} pr="md" direction="column" rowGap={"4px"} w={"70%"}>
          <Flex>
            <Text c={"gray.6"} w="120px">
              사용가능 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={budget || 0} suffix=" 원" />
            </Text>
          </Flex>
          <Flex>
            <Text c={"gray.6"} w="120px">
              사용한 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={expenses || 0} suffix=" 원" />
            </Text>
          </Flex>
          <Flex>
            <Text c={"gray.6"} w="120px">
              남은 금액
            </Text>
            <Text component="span" c={"gray.6"}>
              <NumberFormatter thousandSeparator value={balance || 0} suffix=" 원" />
            </Text>
          </Flex>
        </Flex>
        <Flex p={rem(8)} w={"30%"} mah={100} justify={"center"}>
          <ChartComponent stats={stats} />
        </Flex>
      </Flex>
    </>
  );
};
