"use client";
import Vacation from "@/components/Attendance/Vacation";
import AttendanceAll from "@/components/Dashboard/attendance";
import AttendanceSummary from "@/components/Dashboard/attendance/summary";
import GreetingMessage from "@/components/Dashboard/greeting/GreetingMessage";
import DashboardNotice from "@/components/Dashboard/notice/DashboardNotice";
import { ActionIcon, Button, Container, Grid, GridCol, Group, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";
import IconDots from "/public/icons/dots.svg";
import dayjs from "dayjs";
import WorkHourStats from "@/components/Dashboard/workHourStats";
import MainCalendar from "@/components/Dashboard/calendar";

function page() {
  const [opened, { open, close }] = useDisclosure(false);
  // const [opened, { toggle }] = useDisclosure(false);
  const [activeTab, setActiveTab] = useState<string | null>("first");
  const [workTimeTab, setWorkTimeTab] = useState<string | null>("week");
  const pathname = usePathname();

  const router = useRouter();
  const goNotice = () => router.push("/notice");

  const [dateValue, setDateValue] = useState<Date | null>(new Date());

  const goVacation = () => router.push("/attendance/vacation");
  return (
    <Container fluid p={"lg"}>
      <GreetingMessage />
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack>
            <MainCalendar dateValue={dateValue} setDateValue={setDateValue} />
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
                  <ActionIcon onClick={goVacation} variant="default">
                    <IconDots />
                  </ActionIcon>
                </Group>
              </Group>

              <AttendanceSummary />
            </Paper>
            <WorkHourStats dateValue={dateValue} />
          </Stack>
        </GridCol>
      </Grid>
      <Vacation opened={opened} close={close} />
    </Container>
  );
}

export default page;
