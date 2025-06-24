// import { getVacationSummary } from "@/app/api/get/getApi";
// import ToolTipDetailsVacation from "@/components/Attendance/ToolTipDetailsVacation";
// import { TYearMonth } from "@/types/apiTypes";
import { leaveService } from "@/api/services/leave/leave.services";
import { useApiQuery } from "@/api/useApi";
import ToolTipDetailsVacation from "@/components/common/tooltip/ToolTipDetailsVacation";
import type { TYearMonth } from "@/types/apiTypes/apiTypes";
import { ActionIcon, Grid, Group, Paper, Popover, Stack, Text } from "@mantine/core";
// import { IconDots, IconInfoCircle } from "@tabler/icons-react";
// import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Ellipsis, Info } from "lucide-react";
import { useMemo } from "react";
// import ToolTipDetailsVacation from "./tooltip";

const VacationSummary = ({ params }: { params: TYearMonth }) => {
  const {
    data: vacationSummary,
    isLoading: isLoading_vacationSummary,
    isError: isError_vacationSummary,
  } = useApiQuery(["vacationSummary", { year: params.year }], () => leaveService.getLeaveSummary({ year: params.year }));

  const leaveSummary = vacationSummary?.data.data.leaveSummary;
  const leaveUsageStats = vacationSummary?.data.data.leaveUsageStats;

  const isDateAfter = useMemo(() => {
    return dayjs().isAfter(dayjs(leaveSummary?.oneYearAfterJoin), "day");
  }, [leaveSummary]);
  return (
    <Stack gap={2} w={"100%"}>
      <Text fz={"sm"} fw={500} c={"gray"}>
        휴가정보
      </Text>
      <Paper bg={"white"} px="lg" py="md" h={"100%"} radius={"lg"} pos={"relative"}>
        <Grid align="stretch" gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group gap={"xl"} justify="space-around" align="end" maw={350} mx={"auto"}>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"sm"}>
                  총 연차 개수
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={500} component="span" fz={"md"}>
                    {leaveSummary?.totalReceivedAnnualLeave}
                  </Text>
                  일
                </Text>
              </Stack>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"sm"}>
                  사용 연차
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={500} component="span" fz={"md"}>
                    {leaveSummary?.totalAnnualLeaveUsage}
                  </Text>
                  일
                </Text>
              </Stack>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"sm"}>
                  잔여 연차
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={500} component="span" fz={"md"}>
                    {leaveSummary?.totalAnnualLeaveBalance}
                  </Text>
                  일
                </Text>
              </Stack>
            </Group>
          </Grid.Col>

          {/* <Divider my={"sm"} /> */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group justify="space-between" align="end" wrap="nowrap">
              <Stack gap={"xs"}>
                <Group gap={"xs"} wrap="nowrap">
                  <Text fz={"sm"} c={"gray.5"} w={50}>
                    입사일
                  </Text>
                  <Group gap={"xs"}>
                    <Text fz={"sm"}>{leaveSummary?.joinDate}</Text>
                    <Popover position="bottom" withArrow shadow="md">
                      <Popover.Target>
                        <ActionIcon size="compact-xs" variant="subtle" radius={"xs"} hidden={isDateAfter}>
                          <Info size={18} />
                        </ActionIcon>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <Stack gap={"xs"}>
                          <Group gap={"xs"} wrap="nowrap">
                            <Text fz={"sm"} c={"gray.5"} w={110}>
                              만 1년 날짜
                            </Text>
                            <Text fz={"sm"}>{leaveSummary?.oneYearAfterJoin}</Text>
                          </Group>
                          <Group gap={"xs"}>
                            <Text fz={"sm"} c={"gray.5"} w={110}>
                              중도입사 연차 부여
                            </Text>
                            <Text fz={"sm"}>{leaveSummary?.midJoinReceivedAnnualLeave}개</Text>
                          </Group>
                        </Stack>
                      </Popover.Dropdown>
                    </Popover>
                  </Group>
                </Group>
                <Group gap={"xs"}>
                  <Text fz={"sm"} c={"gray.5"} w={50}>
                    근속년수
                  </Text>
                  <Text fz={"sm"}>{leaveSummary?.yearsSinceJoin}년</Text>
                </Group>
              </Stack>

              {/* */}
              <ToolTipDetailsVacation details={leaveUsageStats}>
                <ActionIcon size="compact-xs" variant="subtle" radius={"xs"}>
                  <Ellipsis />
                </ActionIcon>
              </ToolTipDetailsVacation>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default VacationSummary;
