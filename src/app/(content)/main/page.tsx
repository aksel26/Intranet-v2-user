"use client";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Grid,
  GridCol,
  Group,
  Paper,
  Progress,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import ArrowDown from "/public/icons/arrow-down.svg";
import ArrowRight from "/public/icons/arrow-right.svg";
import IconDots from "/public/icons/dots.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { Calendar } from "@mantine/dates";
import { DonutChart } from "@mantine/charts";
import DashboardNotice from "@/components/Dashboard/notice/DashboardNotice";
import { myInfoStore } from "@/lib/store/myInfoStore";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Line),
  {
    ssr: false, // 서버사이드 렌더링 비활성화
  }
);

function page() {
  const doughnutData = [
    { name: "USA", value: 400, color: "indigo.6" },
    { name: "India", value: 300, color: "yellow.6" },
    { name: "Japan", value: 100, color: "teal.6" },
    { name: "Other", value: 200, color: "gray.6" },
  ];
  const [opened, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [workTimeTab, setWorkTimeTab] = useState<string | null>("week");
  const pathname = usePathname();

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 12,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        grid: {
          display: false, // 세로 선 제거
        },
      },
    },
  };
  const labels = ["일", "월", "화", "수", "목", "금", "토"];
  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        data: [0, 12, 4, 3.4, 5, 0, 4], // 샘플 데이터
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.4,
      },
    ],
  };

  const router = useRouter();
  const goNotice = () => router.push("/notice");
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
              <Calendar
                highlightToday
                locale="ko"
                firstDayOfWeek={0}
                styles={{
                  month: { width: "100%" },
                  calendarHeader: { maxWidth: "unset" },
                  day: { width: "100%", height: 60 },
                }}
              />
            </Paper>
            <Paper p={"lg"} radius={"lg"}>
              <Title order={5} mb={"md"}>
                오늘 일정
              </Title>
              <Stack gap={"xs"}>
                <Group>
                  <Badge size="md">검사운영</Badge>
                  <Text fz={"sm"}>LG전자</Text>
                </Group>
                <Group>
                  <Badge size="md">검사운영</Badge>
                  <Text fz={"sm"}>LG전자</Text>
                </Group>
                <Group>
                  <Badge size="md" color={"green"}>
                    외근
                  </Badge>
                  <Text fz={"sm"}>LG 유플러스 미팅</Text>
                </Group>
              </Stack>
            </Paper>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <Paper
              p={"lg"}
              radius={"lg"}
              className={
                activeTab === "second"
                  ? "bg-gradient-to-r from-yellow-100 to-red-100"
                  : ""
              }
            >
              <Tabs
                value={activeTab}
                onChange={setActiveTab}
                variant="pills"
                radius={"lg"}
              >
                <Tabs.List justify="space-between">
                  <Group>
                    <Tabs.Tab value="first">공지사항</Tabs.Tab>
                    <Tabs.Tab value="second">생일자</Tabs.Tab>
                  </Group>

                  <Button
                    size="xs"
                    variant="subtle"
                    onClick={goNotice}
                    rightSection={<ArrowRight />}
                  >
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

            <Paper p={"lg"} radius={"lg"}>
              <Group justify="space-between">
                <Title order={5}>나의 근태 현황</Title>
                <ActionIcon variant="light" onClick={goNotice}>
                  <IconDots />
                </ActionIcon>
                {/* <Badge size="md" color="blue" radius="md">
                  정상출근
                </Badge> */}
              </Group>
              <Group justify="space-evenly">
                <Badge size="lg" color="blue" radius="md">
                  정상출근
                </Badge>

                <Divider orientation="vertical" />
                <Stack gap={"xs"}>
                  <Group>
                    <Text size="sm">업무 경과시간</Text>
                    <Text size="sm" styles={{ root: { letterSpacing: 1.2 } }}>
                      12:22:00
                    </Text>
                  </Group>
                  <Progress value={50} />
                </Stack>
                <Divider orientation="vertical" />
                <Stack gap={"xs"}>
                  <Group align="center">
                    <Text size="sm">전체 휴가일 수</Text>
                    <Text size="sm" styles={{ root: { letterSpacing: 1.1 } }}>
                      <Text fw={900} size="xl" component="span">
                        15
                      </Text>
                      일
                    </Text>
                  </Group>
                  <Group align="center">
                    <Text size="sm">잔여 휴가일 수</Text>
                    <Text size="sm" styles={{ root: { letterSpacing: 1.1 } }}>
                      <Text fw={900} size="xl" component="span">
                        2.5
                      </Text>
                      일
                    </Text>
                  </Group>
                </Stack>
              </Group>
            </Paper>
            <Paper p={"lg"} radius={"lg"}>
              <Group justify="space-between" align="flex-start">
                <Title order={5}>근태 현황 +10</Title>
                <ActionIcon
                  size={"sm"}
                  variant="transparent"
                  onClick={toggle}
                  color="gray"
                >
                  <ArrowDown />
                </ActionIcon>
              </Group>
              <Collapse in={opened}>
                <Stack gap={"sm"} mt={"md"}>
                  <Group>
                    <Badge size="sm">연차</Badge>
                    <Group gap={7}>
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                    </Group>
                  </Group>
                  <Group>
                    <Badge size="sm">오전반반차</Badge>
                    <Group gap={7}>
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                    </Group>
                  </Group>
                  <Group>
                    <Badge size="sm">오전반차</Badge>
                    <Group gap={7}>
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                    </Group>
                  </Group>
                  <Group>
                    <Badge size="sm">오후반차</Badge>
                    <Group gap={7}>
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                    </Group>
                  </Group>
                  <Group>
                    <Badge color="gray" size="sm">
                      보건휴가
                    </Badge>
                    <Group gap={7}>
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                      <Divider orientation="vertical" />
                      <Text fz={"sm"}>김정순</Text>
                    </Group>
                  </Group>
                </Stack>
              </Collapse>
            </Paper>
          </Stack>
        </GridCol>
        {/* <GridCol span={{ base: 12, md: 4 }}>
          <Paper p={"lg"} radius={"lg"}>
            <Group>
              <Title order={5}>나의 근태 현황</Title>
              <Badge size="md" color="blue" radius="md">
                정상출근
              </Badge>
            </Group>
            <Stack>
              <Stack gap={3} mt={"xl"}>
                <Group>
                  <Text size="sm">업무 경과시간</Text>
                  <Text size="sm" styles={{ root: { letterSpacing: 1.2 } }}>
                    12:22:00
                  </Text>
                </Group>

                <Progress value={50} />
              </Stack>
              <Divider label="휴가" labelPosition="center" mt={"lg"} />
              <Group align="center">
                <Text size="sm">나의 전체 휴가일 수</Text>
                <Text size="sm" styles={{ root: { letterSpacing: 1.1 } }}>
                  <Text fw={900} size="xl" component="span">
                    15
                  </Text>
                  일
                </Text>
              </Group>
              <Group align="center">
                <Text size="sm">나의 잔여 휴가일 수</Text>
                <Text size="sm" styles={{ root: { letterSpacing: 1.1 } }}>
                  <Text fw={900} size="xl" component="span">
                    2.5
                  </Text>
                  일
                </Text>
              </Group>
            </Stack>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }}>
          <Paper p={"lg"} radius={"lg"}>
            <Title order={5}>근무시간</Title>

            <Tabs value={workTimeTab} onChange={setWorkTimeTab}>
              <Tabs.List>
                <Tabs.Tab value="week">주간 근무시간</Tabs.Tab>
                <Tabs.Tab value="month">월간 근무시간</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="week" pt={"md"}>
                <Group justify="flex-end">
                  <Text fz={"sm"}>
                    12월 3주
                    <Text ml={"sm"} fz={20} fw={900} component="span">
                      48h
                    </Text>
                  </Text>
                </Group>
                <Box h={245}>
                  <LineChart key={pathname} options={options} data={data} />
                </Box>
              </Tabs.Panel>
              <Tabs.Panel value="month" pt={"md"}>
                <Stack gap={"sm"}>
                  <Text fz={"sm"}>정정규 위원 생일</Text>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }}>
          <Paper p={"lg"} radius={"lg"}>
            <Group justify="space-between" align="flex-start">
              <Title order={5}>근태 현황 +10</Title>
              <ActionIcon size={"sm"} variant="transparent" onClick={toggle} color="gray">
                <ArrowDown />
              </ActionIcon>
            </Group>
            <Collapse in={opened}>
              <Stack gap={"sm"} mt={"md"}>
                <Group>
                  <Badge size="sm">연차</Badge>
                  <Group gap={7}>
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                  </Group>
                </Group>
                <Group>
                  <Badge size="sm">오전반반차</Badge>
                  <Group gap={7}>
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                  </Group>
                </Group>
                <Group>
                  <Badge size="sm">오전반차</Badge>
                  <Group gap={7}>
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                  </Group>
                </Group>
                <Group>
                  <Badge size="sm">오후반차</Badge>
                  <Group gap={7}>
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                  </Group>
                </Group>
                <Group>
                  <Badge color="gray" size="sm">
                    보건휴가
                  </Badge>
                  <Group gap={7}>
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                    <Divider orientation="vertical" />
                    <Text fz={"sm"}>김정순</Text>
                  </Group>
                </Group>
              </Stack>
            </Collapse>
          </Paper>
        </GridCol> */}
      </Grid>
    </Container>
  );
}

export default page;
