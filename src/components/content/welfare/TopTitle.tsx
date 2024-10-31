import useTopTitle from "@/hooks/useTopTitle";
import { ChartSummary } from "@/template/ChartSummary";
import { Box, Flex, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

export const TopTitle = () => {
  const pathName = usePathname();
  const { typeTitle, statsInfo } = useTopTitle({ pathName });
  console.log("🚀 ~ TopTitle ~ statsInfo:", statsInfo);

  return (
    <Flex direction={"column"} bg={"white"} px="md" py="lg" rowGap={"md"}>
      <Box>
        <Text size="xl" fw={700}>
          {typeTitle}
        </Text>
        <Text size="sm" fw={500} c={"gray.6"}>
          {dayjs().format("MM월 DD일 dddd")}
        </Text>
      </Box>
      <Box>
        <Flex direction={"column"}>
          <Text fw={700} c={"blue.9"}>
            {statsInfo.userName || ""}
            <Text c={"gray.9"} component="span" mr={0}>
              님의 잔여 {typeTitle}는
            </Text>
          </Text>

          <Flex align={"center"}>
            <Text mx={5} component="span" c={"blue.9"} fw={700} size="xl">
              <NumberFlow
                value={statsInfo.balance}
                // value={Number(welfareStats.welfareBalance) || 0}
                locales="ko-KR" // Intl.NumberFormat locales
              />
            </Text>
            <Text>원 입니다</Text>
          </Flex>
        </Flex>
      </Box>
      <ChartSummary stats={statsInfo} />
    </Flex>
  );
};
