"use client";

import CalendarAttendance from "@/components/content/attendance/CalendarAttendance";
import "@/styles/calendar.css";
import {
  Badge,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Drawer,
  FileButton,
  Grid,
  GridCol,
  Group,
  Indicator,
  Input,
  List,
  Paper,
  Popover,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import IconInfoCircle from "/public/icons/info-circle.svg";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
const items = [
  { title: "근태관리", href: "#" },
  { title: "휴가관리", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));

const CountText = ({ children }: any) => {
  return <Text size="xs">{children}</Text>;
};
function page() {
  const [opened, { open, close }] = useDisclosure(false);
  const [value, setValue] = useState<Date[]>([]);
  const [file, setFile] = useState<File | null>(null);

  return (
    <Container
      fluid
      p={"lg"}
      style={{
        scrollPaddingBottom: "52px",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>

      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
            <Title order={5} mb={"xs"}>
              휴가 요약
            </Title>
            <Group gap={"xs"} justify="space-evenly">
              <Stack gap={4}>
                <Popover
                  width={"auto"}
                  position="top-start"
                  withArrow
                  shadow="md"
                >
                  <Popover.Target>
                    <Group align="center" gap={4}>
                      <Text fz={"sm"}>총 연차 수</Text>
                      <ThemeIcon variant="white">
                        <IconInfoCircle />
                      </ThemeIcon>
                    </Group>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Group>
                      <Stack gap={4}>
                        <Text fz={"xs"}>현재날짜</Text>
                        <Text fz={"xs"}>2024-11-28</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>입사일</Text>
                        <Text fz={"xs"}>1999-02-19</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>근속년수</Text>
                        <Text fz={"xs"}>25년</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>누적 연차 수</Text>
                        <Text fz={"xs"}>10개</Text>
                      </Stack>
                    </Group>
                  </Popover.Dropdown>
                </Popover>
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
            </Group>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 4 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
            <Title order={5} mb={"xs"}>
              휴가 종류별 사용 일 수
            </Title>
            <Group gap={"xl"}>
              <Stack gap={"xs"} justify="center" align="center">
                <Group justify="space-between" w={"100%"}>
                  <Badge radius={"sm"}>연차</Badge>

                  <CountText>1개</CountText>
                </Group>
                <Group justify="space-between" w={"100%"}>
                  <Badge radius={"sm"} size="md">
                    반차
                  </Badge>

                  <CountText>1개</CountText>
                </Group>
                <Group align="center">
                  <Badge radius={"sm"}>반반차</Badge>
                  <CountText>1개</CountText>
                </Group>
              </Stack>
              <Divider orientation="vertical" />
              <Group gap={"lg"} align="center">
                <Stack gap={"xs"}>
                  <Group justify="space-between" w={"100%"}>
                    <Badge variant="outline" radius={"sm"}>
                      조퇴
                    </Badge>

                    <CountText>1개</CountText>
                  </Group>
                  <Group justify="space-between" w={"100%"}>
                    <Badge variant="outline" radius={"sm"}>
                      훈련
                    </Badge>

                    <CountText>1개</CountText>
                  </Group>
                  <Group align="center">
                    <Badge variant="outline" radius={"sm"}>
                      대체휴무
                    </Badge>
                    <CountText>1개</CountText>
                  </Group>
                </Stack>
                <Stack gap={"xs"}>
                  <Group align="center">
                    <Badge variant="outline" radius={"sm"}>
                      특별휴가
                    </Badge>
                    <CountText>1개</CountText>
                  </Group>
                  <Group align="center">
                    <Badge variant="outline" radius={"sm"}>
                      경조휴무
                    </Badge>
                    <CountText>1개</CountText>
                  </Group>
                  <Group align="center">
                    <Badge variant="outline" radius={"sm"}>
                      무급휴가
                    </Badge>
                    <CountText>1개</CountText>
                  </Group>
                </Stack>
              </Group>
            </Group>
          </Paper>
        </GridCol>

        <GridCol span={{ base: 12, md: 5 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
            <Title order={5} mb={"xs"}>
              나의 휴가 캘린더
            </Title>
            <CalendarAttendance />
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, md: 7 }}>
          <Stack gap={"md"} h={"100%"}>
            <Button
              variant="gradient"
              fullWidth
              gradient={{ from: "blue", to: "cyan", deg: 90 }}
              onClick={open}
            >
              휴가 신청
            </Button>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                휴가 신청 내역
              </Title>

              <List spacing="xs" size="sm" center>
                <List.Item>
                  <Group>
                    <Badge>승인</Badge>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">연차</Text>
                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Badge color="yellow">미승인</Badge>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">오전반반차</Text>
                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
              </List>
            </Paper>
            <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
              <Title order={5} mb={"xs"}>
                사용내역 조회
              </Title>
              <List spacing="xs" size="sm" center>
                <List.Item w={"100%"}>
                  <Group>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">연차</Text>

                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">오전반반차</Text>
                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">오전반반차</Text>
                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
                <List.Item>
                  <Group>
                    <Text size="xs">2024-12-01</Text>
                    <Text size="xs">오전반반차</Text>
                    <Text size="xs">승인자 : 김현근</Text>
                  </Group>
                </List.Item>
              </List>
            </Paper>
          </Stack>
        </GridCol>
      </Grid>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        title="휴가 신청하기"
      >
        <DatePicker
          highlightToday
          locale="ko"
          type="multiple"
          firstDayOfWeek={0}
          onChange={setValue}
          style={{ width: "100%" }}
          styles={{
            month: { width: "100%" },
            calendarHeader: { maxWidth: "unset" },
          }}
          renderDay={(date) => {
            const day = date.getDate();
            const isToday = dayjs(date).isSame(dayjs(), "day");
            if (day === 14) {
              return (
                <Indicator
                  color="yellow"
                  position="top-end"
                  size={10}
                  offset={-5}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }
            if (day === 15) {
              return (
                <Indicator
                  color="blue"
                  position="top-end"
                  size={10}
                  offset={-5}
                >
                  <div>{day}</div>
                </Indicator>
              );
            }
            return (
              <Indicator
                color="yellow"
                position="top-end"
                size={12}
                processing
                offset={-5}
                disabled={!isToday}
              >
                <div>{day}</div>
              </Indicator>
            );
          }}
        />
        <Text my={"sm"}>신청정보</Text>
        <Stack px="md">
          {value.length < 1 ? (
            <Text c={"dimmed"} fz={"sm"} ta={"center"}>
              캘린더에서 일자를 선택해 주세요.
            </Text>
          ) : (
            <Stack gap={"xs"}>
              {value.map((item: any) => (
                <Group wrap="nowrap" justify="space-between">
                  <Input.Wrapper
                    label="신청일"
                    styles={{
                      label: { fontSize: "var(--mantine-font-size-xs" },
                    }}
                  >
                    <Input
                      value={dayjs(item).format("YYYY-MM-DD")}
                      readOnly
                      variant="unstyled"
                      size="sm"
                      w={80}
                      styles={{ wrapper: { fontWeight: 700 } }}
                    />
                  </Input.Wrapper>

                  <Select
                    styles={{
                      label: { fontSize: "var(--mantine-font-size-xs" },
                    }}
                    checkIconPosition="right"
                    size="sm"
                    label="휴가 유형"
                    placeholder="Pick value"
                    clearable
                    data={[
                      {
                        group: "일반휴가",
                        items: [
                          "연차",
                          "오전 반차",
                          "오후 반차",
                          "오전 반반차",
                          "오후 반반차",
                        ],
                      },
                      {
                        group: "특이사항",
                        items: [
                          "조퇴",
                          "훈련",
                          "대체휴무",
                          "특별휴가",
                          "경조휴무",
                          "무급휴가",
                        ],
                      },
                    ]}
                  />
                </Group>
              ))}
            </Stack>
          )}
          <Divider />

          <Select
            styles={{ label: { fontSize: "var(--mantine-font-size-xs" } }}
            size="sm"
            label="승인자 선택"
            placeholder="결재 담당자를 선택해 주세요."
            data={["정진우", "김현근"]}
            clearable
            checkIconPosition="right"
          />
          {file && (
            <Text size="xs" ta="center" mt="sm">
              파일명: {file.name}
            </Text>
          )}
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button variant="light" {...props}>
                첨부사진 올리기
              </Button>
            )}
          </FileButton>

          <Button fullWidth>신청완료</Button>
        </Stack>
      </Drawer>
    </Container>
  );
}

export default page;
