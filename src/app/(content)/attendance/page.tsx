"use client";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import { CompositeChart } from "@mantine/charts";
import { Badge, Breadcrumbs, Container, Divider, Grid, GridCol, Group, List, Paper, rem, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import "../../../styles/calendar.css";
import IconCircleCheck from "/public/icons/circle-check.svg";
export const data = [
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

const items = [
  { title: "근태관리", href: "#" },
  { title: "근태 · 휴가 메인", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={700} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));
function page() {
  const router = useRouter();
  const pathName = usePathname();

  const goVacation = () => router.push(`${pathName}/vacation`);
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
      {/* <Text size="lg" fw={700} mb={"md"}>
        근태 · 휴가
      </Text> */}

      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
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
                <Text ta={"center"} fz={"md"} styles={{ root: { letterSpacing: 1.1 } }}>
                  08:01:23
                </Text>
              </Stack>
            </Group>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 6 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"} onClick={goVacation}>
            <Title order={5} mb={"xs"}>
              휴가 요약
            </Title>
            <Group gap={"sm"} justify="space-evenly">
              <Stack gap={4}>
                <Text fz={"sm"}>총 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>사용 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>잔여 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>미승인 요청건</Text>
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
        <GridCol span={{ base: 12, md: 3.5 }}>
          <Stack gap={"md"} h={"100%"}>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                이번달 업무 시간
              </Title>

              <CompositeChart
                h={220}
                data={data}
                withLegend
                legendProps={{ verticalAlign: "top", height: 50 }}
                dataKey="date"
                maxBarWidth={30}
                referenceLines={[{ y: 40, label: "주 40시간", color: "red.6" }]}
                series={[
                  { name: "근무시간", color: "rgba(18, 120, 255, 0.2)", type: "bar" },
                  // { name: "limitTime", color: "red.8", type: "line", strokeDasharray: "5 5" },
                ]}
                curveType="linear"
              />
            </Paper>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                이번달 나의 시간외 근무
              </Title>
              <List
                spacing="xs"
                icon={
                  <ThemeIcon color="teal" size={24} variant="light" radius="md">
                    <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>5일 월요일</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>5일 월요일</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>5일 월요일</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text fz={"sm"}>LG U+ 면접운영 진행</Text>
                    <Text fz={"sm"}>5일 월요일</Text>
                  </Group>
                </List.Item>
              </List>
            </Paper>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 3.5 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
            <Title order={5} mb={"xs"}>
              팀 캘린더
            </Title>

            <FullCalendar
              //   datesSet={handleDatesSet}
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
              events={[
                { start: "2024-11-24", title: "출근" },
                { start: "2024-11-25", title: "출근" },
                { start: "2024-11-26", title: "출근" },
                { start: "2024-11-28", title: "출근" },
                { start: "2024-11-27", title: "출근" },
              ]}
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
        </GridCol>

        <GridCol span={{ base: 12, md: 5 }}>
          <Stack gap={"md"} h={"100%"}>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                금일 외근 현황
              </Title>
              <Stack>
                <Group>
                  <Badge>외근</Badge>
                  <Text fz={"sm"}>
                    이근하{" "}
                    <Text fz={"sm"} component="span" ml={2}>
                      책임
                    </Text>
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    Assessment 1팀
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    09:40 ~ 17:40
                  </Text>
                </Group>
                <Group>
                  <Badge>출장</Badge>
                  <Text fz={"sm"}>
                    이근
                    <Text fz={"sm"} component="span" ml={2}>
                      책임
                    </Text>
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    Assessment 1팀
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    09:40 ~ 17:40
                  </Text>
                </Group>
                <Group>
                  <Badge>외근</Badge>
                  <Text fz={"sm"}>
                    한마희
                    <Text fz={"sm"} component="span" ml={2}>
                      팀장
                    </Text>
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    Assessment 1팀
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    09:40 ~ 17:40
                  </Text>
                </Group>
              </Stack>
            </Paper>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                휴가 현황
              </Title>
              <Stack>
                <Group>
                  <Badge>오전반차</Badge>
                  <Stack gap={2}>
                    <Group>
                      <Text fz={"sm"}>
                        이근하{" "}
                        <Text fz={"sm"} component="span" ml={2}>
                          책임
                        </Text>
                      </Text>
                      <Text fz={"xs"} c={"dimmed"}>
                        Assessment 1팀
                      </Text>
                    </Group>
                    <Text fz={"xs"} c={"dimmed"}>
                      근무시간 : 14:00 ~ 18:00
                    </Text>
                  </Stack>
                </Group>
                <Group>
                  <Badge>오전반차</Badge>
                  <Stack gap={2}>
                    <Group>
                      <Text fz={"sm"}>
                        이근하{" "}
                        <Text fz={"sm"} component="span" ml={2}>
                          책임
                        </Text>
                      </Text>
                      <Text fz={"xs"} c={"dimmed"}>
                        Assessment 1팀
                      </Text>
                    </Group>
                    <Text fz={"xs"} c={"dimmed"}>
                      근무시간 : 14:00 ~ 18:00
                    </Text>
                  </Stack>
                </Group>
              </Stack>
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
