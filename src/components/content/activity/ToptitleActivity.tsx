import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { Box, Flex, Paper, Stack, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";

export const ToptitleActivity = ({ stats, isLoading, isError }: any) => {
  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>활동비 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
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
              <Text fw={600} c={"blue.9"} fz={"lg"}>
                {stats.hqName || ""}
                <Text c={"gray.9"} component="span" mr={0} fz={"sm"}>
                  의 잔여 활동비는
                </Text>
              </Text>

              <Flex align={"center"}>
                <Text mx={5} component="span" c={"blue.9"} fw={600} fz={"lg"} styles={{ root: { letterSpacing: 1.0 } }}>
                  <NumberFlow
                    transformTiming={{ duration: 750, easing: "ease-out" }}
                    spinTiming={{ duration: 750, easing: "ease-out" }}
                    opacityTiming={{ duration: 350, easing: "ease-out" }}
                    value={stats.activityBalance || 0}
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
  return <>{renderContent()}</>;
};
