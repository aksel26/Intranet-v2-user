import useTopTitle from "@/hooks/useTopTitle";
import { ChartSummary } from "@/template/ChartSummary";
import { Box, Flex, Paper, Stack, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";

export const ToptitleActivity = () => {
  const pathName = usePathname();
  const { typeTitle, statsInfo } = useTopTitle({ pathName });

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Stack gap={"md"}>
        <Box>
          <Text size="xl" fw={700}>
            활동비
          </Text>
          <Text size="sm" fw={500} c={"gray.6"}>
            {dayjs().format("MM월 DD일 dddd")}
          </Text>
        </Box>
        <Box>
          <Flex direction={"column"} rowGap={5}>
            <Text fw={700} c={"blue.9"} fz={"lg"}>
              {/* {statsInfo.userName || ""} */}
              {statsInfo.hqName || ""}
              <Text c={"gray.9"} component="span" mr={0} fz={"sm"}>
                의 잔여 활동비는
              </Text>
            </Text>

            <Flex align={"center"}>
              <Text mx={5} component="span" c={"blue.9"} fw={700} fz={"lg"} styles={{ root: { letterSpacing: 1.0 } }}>
                <NumberFlow
                  value={statsInfo.balance}
                  // value={Number(welfareStats.welfareBalance) || 0}
                  locales="ko-KR" // Intl.NumberFormat locales
                />
              </Text>
              <Text fz={"sm"}>원 입니다</Text>
            </Flex>
          </Flex>
        </Box>
      </Stack>
      {/* <ChartSummary statsInfo={statsInfo} /> */}
    </Paper>
  );
};
