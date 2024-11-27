"use client";
import { Badge, Box, Container, Divider, Flex, Grid, GridCol, Group, Indicator, List, Paper, Progress, Stack, Tabs, Text, Title } from "@mantine/core";
import React, { useState } from "react";
import { CompositeChart } from "@mantine/charts";
import { useHover } from "@mantine/hooks";
import { Calendar } from "@mantine/dates";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../../styles/calendar.css";
export const data = [
  {
    date: "1주차",
    workingTime: 34.3,
    limitTime: 40,
  },
  {
    date: "2주차",
    workingTime: 34.3,
    limitTime: 40,
  },
  {
    date: "3주차",
    workingTime: 24.3,
    limitTime: 40,
  },
  {
    date: "4주차",
    workingTime: 54.3,
    limitTime: 40,
  },
  {
    date: "5주차",
    workingTime: 14.3,
    limitTime: 40,
  },
];
function page() {
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Text size="lg" fw={700} mb={"md"}>
        근태 · 휴가
      </Text>

      <Grid>
        <GridCol span={{ base: 12, md: 5 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
            <Title order={5} mb={"xs"}>
              출근 요약
            </Title>
            <Group gap={"xl"} align="flex-start" justify="space-evenly">
              <Stack gap={4} justify="center" align="center">
                <Text>나의 출근 현황</Text>
                <Badge radius={"md"} size="lg">
                  정상 출근
                </Badge>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text>오늘 출근 시간</Text>
                <Text ta={"center"} fz={"md"}>
                  08:01:23
                </Text>
              </Stack>
            </Group>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 7 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
            <Title order={5} mb={"xs"}>
              휴가 요약
            </Title>
            <Group gap={"sm"} justify="space-evenly">
              <Stack gap={4}>
                <Text>총 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text>사용 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text>잔여 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text>미승인 요청건</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    2
                  </Text>
                  건
                </Text>
              </Stack>
            </Group>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 5 }}>
          <Stack gap={"md"}>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Stack gap={2}>
                <Title order={5} mb={"xs"}>
                  금일 근무 시간
                </Title>
                <Text c={"dimmed"} fz={"sm"} mb={4}>
                  경과시간 : 13:22:11
                </Text>
                <Stack gap={5}>
                  <Progress value={50} />
                  <Group justify="space-between">
                    <Text c={"dimmed"} fz={"xs"}>
                      0h
                    </Text>
                    <Text c={"dimmed"} fz={"xs"}>
                      4.5h
                    </Text>
                    <Text c={"dimmed"} fz={"xs"}>
                      9h
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Paper>

            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Stack>
                <Title order={5}>이번달 업무 시간</Title>
                <CompositeChart
                  h={300}
                  data={data}
                  dataKey="date"
                  maxBarWidth={30}
                  series={[
                    { name: "workingTime", color: "rgba(18, 120, 255, 0.2)", type: "bar" },
                    { name: "limitTime", color: "red.8", type: "line" },
                  ]}
                  curveType="linear"
                />
              </Stack>
              <Group justify="flex-end">
                <Box bg={"red"} w={50} h={5} />
                <Text c={"dimmed"} fz={"xs"}>
                  40시간
                </Text>
              </Group>
            </Paper>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 7 }}>
          <Stack gap={"md"} h={"100%"}>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                이번달 시간외 근무
              </Title>
              <List>
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>5일 월요일</Text>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>15:22 ~22:23</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>5일 월요일</Text>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>~22:23</Text>
                  </Group>
                </List.Item>
              </List>
            </Paper>
            <Paper h={"100%"} bg={"white"} px="md" py="lg" radius={"lg"}>
              <FullCalendar
                // ref={calendarRef}
                // datesSet={handleDatesSet}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,title,next",
                  center: "", // 커스텀 버튼을 중앙에 배치
                  right: "today",
                }}
                selectable
                showNonCurrentDates={false}
                fixedWeekCount={false}
                nowIndicator
                contentHeight={"auto"}
                buttonText={{
                  today: "오늘",
                }}
                weekends={true}
                // events={calendarFormat}
                // eventClick={(info) => {
                //   if (info.event.start) calendarDateStore.setCurrentCalendarDate(info.event.start);
                // }}
                // dateClick={handleDateSelect}
                // select={handleDateSelect}
                height="auto"
                locale="ko"
                plugins={[dayGridPlugin]}
                dayCellContent={(arg) => arg.dayNumberText.replace("일", "")}
              />
            </Paper>
          </Stack>
        </GridCol>

        {/* <Stack>
        <Text>이번달 스케줄</Text>

        <Group>
          <Badge>회의</Badge>
          <Text>23일 월요일</Text>
          <Text>Assessment 1팀 문항 개발자 미팅</Text>
          <Text>정진옥 대표님, 박민옥 본부장</Text>
        </Group>
        <Group>
          <Badge color="lime">미팅</Badge>
          <Text>23일 월요일</Text>
          <Text>Assessment 1팀 문항 개발자 미팅</Text>
          <Text>정진옥 대표님, 박민옥 본부장</Text>
        </Group>
      </Stack>
      <Stack>
        <Text>공지사항</Text>

        <Group>
          <Badge>회의</Badge>
          <Text>23일 월요일</Text>
          <Text>Monthly Meeting</Text>
          <Text>정진옥 대표님</Text>
        </Group>
        <Group>
          <Badge color="lime">행사</Badge>
          <Text>23일 월요일</Text>
          <Text>ACG 워크샵</Text>
          <Text>전 직원</Text>
        </Group>
      </Stack> */}
      </Grid>
    </Container>
  );
}

export default page;
