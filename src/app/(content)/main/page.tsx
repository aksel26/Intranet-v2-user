"use client";
import Vacation from "@/components/Attendance/Vacation";
import AttendanceAll from "@/components/Dashboard/attendance";
import AttendanceSummary from "@/components/Dashboard/attendance/summary";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import DashboardNotice from "@/components/Dashboard/notice/DashboardNotice";
import { CompositeChart } from "@mantine/charts";
import { ActionIcon, Button, Container, Grid, GridCol, Group, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from "chart.js";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";
import IconDots from "/public/icons/dots.svg";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
const data = [
  {
    date: "1주차",
    근무시간: 34.3,
    limitTime: 40,
  },
  {
    date: "2주차",
    근무시간: 34.3,
    limitTime: 40,
  },
  {
    date: "3주차",
    근무시간: 24.3,
    limitTime: 40,
  },
  {
    date: "4주차",
    근무시간: 54.3,
    limitTime: 40,
  },
  {
    date: "5주차",
    근무시간: 14.3,
    limitTime: 40,
  },
];

const LineChart = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false, // 서버사이드 렌더링 비활성화
});

function page() {
  const [opened, { open, close }] = useDisclosure(false);
  // const [opened, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [workTimeTab, setWorkTimeTab] = useState<string | null>("week");
  const pathname = usePathname();

  const router = useRouter();
  const goNotice = () => router.push("/notice");

  const [dateValue, setDateValue] = useState<Date | null>(null);

  return (
    <Container fluid p={"lg"}>
      <GreetingMessage />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <Paper p={"lg"} radius={"lg"}>
              <Title order={5} mb={"md"}>
                캘린더
              </Title>
              <DatePicker
                highlightToday
                locale="ko"
                value={dateValue}
                onChange={setDateValue}
                firstDayOfWeek={0}
                styles={{
                  month: { width: "100%" },
                  calendarHeader: { maxWidth: "unset" },
                  day: { width: "100%", height: 60 },
                }}
              />
            </Paper>
            <AttendanceAll date={dateValue} />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <Paper p={"lg"} radius={"lg"} className={activeTab === "second" ? "bg-gradient-to-r from-yellow-100 to-red-100" : ""}>
              <Tabs value={activeTab} onChange={setActiveTab} variant="pills" radius={"lg"}>
                <Tabs.List justify="space-between">
                  <Group>
                    <Tabs.Tab value="first">공지사항</Tabs.Tab>
                    <Tabs.Tab value="second">생일자</Tabs.Tab>
                  </Group>

                  <Button size="xs" variant="subtle" onClick={goNotice} rightSection={<ArrowRight />}>
                    더보기
                  </Button>
                </Tabs.List>

                <Tabs.Panel value="first" pt={"md"}>
                  <DashboardNotice />
                </Tabs.Panel>
                <Tabs.Panel value="second" pt={"md"}>
                  <Stack gap={"md"}>
                    <Text fz={"sm"}> 🎉 정정규 위원</Text>

                    <Text fz={"sm"}> 🎉 정정규 위원</Text>

                    <Text fz={"sm"}> 🎉 정정규 위원</Text>

                    <Text fz={"sm"}> 🎉 정정규 위원</Text>
                  </Stack>
                </Tabs.Panel>
              </Tabs>
            </Paper>

            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Group justify="space-between" mb={"xs"}>
                <Title order={5}>휴가 요약</Title>
                <Group>
                  <Button variant="gradient" gradient={{ from: "blue", to: "cyan", deg: 90 }} size="xs" onClick={open}>
                    휴가 신청
                  </Button>
                  <ActionIcon
                    // onClick={goVacation}
                    variant="default"
                  >
                    <IconDots />
                  </ActionIcon>
                </Group>
              </Group>

              <AttendanceSummary />
            </Paper>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                이번달 나의 업무 시간
              </Title>

              <CompositeChart
                h={230}
                data={data}
                withLegend
                legendProps={{ verticalAlign: "top", height: 50 }}
                dataKey="date"
                maxBarWidth={30}
                referenceLines={[{ y: 40, label: "주 40시간", color: "red.6" }]}
                series={[
                  {
                    name: "근무시간",
                    color: "rgba(18, 120, 255, 0.2)",
                    type: "bar",
                  },
                ]}
                curveType="linear"
              />
            </Paper>
          </Stack>
        </GridCol>
      </Grid>
      <Vacation opened={opened} close={close} />
    </Container>
  );
}

export default page;
