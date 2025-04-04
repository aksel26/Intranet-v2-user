import { CompositeChart } from "@mantine/charts";
import { ActionIcon, Button, Group, Loader, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import IconDots from "/public/icons/dots.svg";
const WorkHourStats = ({ dateValue }: any) => {
  const param = { year: dayjs(dateValue).year().toString(), month: (dayjs(dateValue).month() + 1).toString() };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceSummary", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }],
    queryFn: () => api.getWorkHourStats(param),
  });

  const router = useRouter();
  const goWorkDetails = () => router.push("/attendance/work");

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Group justify="space-between" align="center" mb={"xs"}>
        <Title order={5}>이번달 나의 업무 시간</Title>

        <ActionIcon onClick={goWorkDetails} variant="default">
          <IconDots />
        </ActionIcon>
      </Group>
      {isLoading ? (
        <Group justify="center" py={"sm"}>
          <Loader color="blue" type="dots" />
        </Group>
      ) : (
        <CompositeChart
          h={230}
          dataKey="week"
          data={data?.data.data.weeklyWorkHours || []}
          withLegend
          legendProps={{ verticalAlign: "top", height: 50 }}
          // dataKey="date"
          maxBarWidth={30}
          referenceLines={[{ y: 40, label: "주 40시간", color: "red.6" }]}
          series={[
            {
              name: "hours",
              color: "rgba(18, 120, 255, 0.2)",
              type: "bar",
              label: "근무시간",
            },
          ]}
          curveType="linear"
        />
      )}
    </Paper>
  );
};

export default WorkHourStats;
