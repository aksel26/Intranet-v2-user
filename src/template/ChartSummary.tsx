import DoughnutChart from "@/components/content/meal/DoughnutChart";
import { Flex, rem, Text } from "@mantine/core";
import React from "react";

export const ChartSummary = () => {
  return (
    <>
      <Flex columnGap={"sm"}>
        <Flex p={"xs"} px="md" bg={"blue.0"} direction="column" rowGap={"4px"} w={"70%"}>
          <Flex>
            <Text w="120px">사용가능 금액</Text>
            <Text>~원</Text>
          </Flex>
          <Flex>
            <Text w="120px">사용한 금액</Text>
            <Text>~원</Text>
          </Flex>
          <Flex>
            <Text w="120px">남은 금액</Text>
            <Text size="sm">~원</Text>
          </Flex>
        </Flex>
        <Flex p={rem(8)} bg={"blue.0"} w={"30%"} mah={100} justify={"center"}>
          <DoughnutChart />
        </Flex>
      </Flex>
    </>
  );
};
