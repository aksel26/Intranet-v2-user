import { getVacationSummary } from "@/app/api/get/getApi";
import ToolTipDetailsVacation from "@/components/Attendance/ToolTipDetailsVacation";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { TYearMonth } from "@/types/apiTypes";
import { Flex, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const VacationSummary = ({ params }: { params: TYearMonth }) => {
  const {
    data,
    isLoading: isLoading,
    isError: isError,
  } = useQuery({ queryKey: ["vacationSummary", { year: params.year }], queryFn: () => getVacationSummary({ year: params.year }) });
  const leaveSummary = data?.data.data.leaveSummary;
  const leaveUsageStats = data?.data.data.leaveUsageStats;

  const Loading = () => <LoadingView />;

  const renderContent = () => {
    if (isLoading) return <Loading />;
    if (isError) return <ErrorView>휴가정보를 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    return (
      <Flex gap={"md"} wrap={"wrap"}>
        <Paper bg={"white"} px="lg" py="md" radius={"lg"} h={"100%"} miw={300}>
          <Group gap={"xl"}>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                입사일
              </Text>
              <Text fw={600} ta={"center"} fz={"sm"}>
                {leaveSummary.joinDate}
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                근속년수
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  {leaveSummary.yearsSinceJoin}
                </Text>
                년
              </Text>
            </Stack>
            {leaveSummary.yearsSinceJoin >= 3 ? null : (
              <>
                <Stack gap={4}>
                  <Text c={"dimmed"} fz={"xs"}>
                    만 1년 날짜
                  </Text>
                  <Text fz={"sm"} fw={600} ta={"center"}>
                    {leaveSummary.oneYearAfterJoin}
                  </Text>
                </Stack>
                <Stack gap={4}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중도입사 연차 부여
                  </Text>
                  <Text fz={"sm"} ta={"center"}>
                    <Text fw={600} component="span" fz={"md"}>
                      {leaveSummary.midJoinReceivedAnnualLeave}
                    </Text>
                    개
                  </Text>
                </Stack>
              </>
            )}
          </Group>
        </Paper>

        <Paper bg={"white"} px="lg" py="md" h={"100%"} radius={"lg"} miw={300} pos={"relative"}>
          <Group gap={"xl"} justify="space-around" align="end">
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                총 연차 개수
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  {leaveSummary.totalReceivedAnnualLeave}
                </Text>
                일
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                사용 연차
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  {leaveSummary.totalAnnualLeaveUsage}
                </Text>
                일
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                잔여 연차
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  {leaveSummary.totalAnnualLeaveBalance}
                </Text>
                일
              </Text>
            </Stack>

            <ToolTipDetailsVacation details={leaveUsageStats} />
          </Group>
        </Paper>
      </Flex>
    );
  };

  return <>{renderContent()}</>;
};

export default VacationSummary;
