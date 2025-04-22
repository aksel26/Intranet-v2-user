import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { Box, Flex, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";

export const TopTitleWelfare = ({ stats, isLoading, isError }: any) => {
  const { myInfo } = myInfoStore();

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>복지포인트 조회를 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (myInfo) {
      return (
        <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
          <Stack gap={"md"}>
            <Box>
              <Text size="xl" fw={700}>
                복지포인트
              </Text>
              <Text size="sm" fw={500} c={"gray.6"}>
                {dayjs().format("MM월 DD일 dddd")}
              </Text>
            </Box>
            <Box>
              <Flex direction={"column"} rowGap={5}>
                <Text fw={600} c={"blue.9"} fz={"lg"}>
                  {myInfo.userName || ""}
                  <Text c={"gray.9"} component="span" mr={0} fz={"sm"}>
                    님의 잔여 복지포인트는
                  </Text>
                </Text>

                <Flex align={"center"}>
                  <Text mx={5} component="span" c={"blue.9"} fw={600} fz={"lg"} styles={{ root: { letterSpacing: 1.0 } }}>
                    <NumberFlow
                      transformTiming={{ duration: 750, easing: "ease-out" }}
                      spinTiming={{ duration: 750, easing: "ease-out" }}
                      opacityTiming={{ duration: 350, easing: "ease-out" }}
                      value={stats.welfareBalance || 0}
                      locales="ko-KR" // Intl.NumberFormat locales
                    />
                  </Text>
                  <Text fz={"sm"}>원 입니다</Text>
                </Flex>
              </Flex>
            </Box>
          </Stack>
        </Paper>
      );
    }
  };

  return <>{renderContent()}</>;
};
