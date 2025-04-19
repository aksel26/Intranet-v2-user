import * as api from "@/app/api/get/getApi";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { CompositeChart } from "@mantine/charts";
import { ActionIcon, Group, Loader, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import IconDots from "/public/icons/dots.svg";
const WorkHourStats = () => {
  const { dateValue } = mainDateStore();
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
          yAxisProps={{
            domain: [0, 50],
            ticks: [0, 10, 20, 30, 40, 50],
            allowDecimals: false,
          }}
          tooltipProps={{
            content: ({ payload, label }) => {
              if (!payload || payload.length === 0) return null;

              return (
                <div
                  style={{
                    background: "white",
                    padding: "8px 12px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  <div className="text-sm mb-1 font-semibold">{label}주차</div>
                  {payload.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-[10px] h-[10px]"
                        style={{
                          background: entry.color,
                        }}
                      />
                      <span className="ml-2 text-sm">{entry.value} 시간</span>
                    </div>
                  ))}
                </div>
              );
            },
          }}
        />
      )}
    </Paper>
  );
};

export default WorkHourStats;
