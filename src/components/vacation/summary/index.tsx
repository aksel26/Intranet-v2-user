import { getVacationSummary } from "@/app/api/get/getApi";
import ToolTipDetailsVacation from "@/components/Attendance/ToolTipDetailsVacation";
import { TYearMonth } from "@/types/apiTypes";
import { ActionIcon, Grid, Group, Paper, Stack, Text } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useSuspenseQuery } from "@tanstack/react-query";

const VacationSummary = ({ params }: { params: TYearMonth }) => {
  const { data } = useSuspenseQuery({
    queryKey: ["vacationSummary", { year: params.year }],
    queryFn: () => getVacationSummary(params).then((res) => res.data),
  });

  const leaveSummary = data?.data.leaveSummary;
  const leaveUsageStats = data?.data.leaveUsageStats;

  return (
    <Stack gap={2} w={"100%"}>
      <Text fz={"sm"} fw={500} c={"gray"}>
        휴가정보
      </Text>
      <Paper
        bg={"white"}
        px="lg"
        py="md"
        h={"100%"}
        radius={"lg"}
        pos={"relative"}
      >
        <Grid align="stretch" gutter="lg">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group
              gap={"xl"}
              justify="space-around"
              align="end"
              maw={350}
              mx={"auto"}
            >
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
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
                <Text c={"dimmed"} fz={"xs"}>
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
                <Text c={"dimmed"} fz={"xs"}>
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
            <Group justify="space-between" align="end">
              <Stack gap={"xs"}>
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"}>
                    입사일
                  </Text>
                  <Text fz={"xs"}>2022-03-01</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"}>
                    근속년수
                  </Text>
                  <Text fz={"xs"}>3년</Text>
                </Group>
              </Stack>
              <Stack gap={"xs"}>
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"}>
                    만 1년 날짜
                  </Text>
                  <Text fz={"xs"}>2022-03-01</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"}>
                    중도입사 연차 부여
                  </Text>
                  <Text fz={"xs"}>3년</Text>
                </Group>
              </Stack>
              <ToolTipDetailsVacation details={leaveUsageStats}>
                <ActionIcon size="compact-xs" variant="subtle" radius={"xs"}>
                  <IconDots />
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
