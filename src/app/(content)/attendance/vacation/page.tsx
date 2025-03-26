"use client";

import * as api from "@/app/api/get/getApi";
import "@/styles/calendar.css";
import { Badge, Breadcrumbs, Button, Collapse, Container, Divider, Flex, Group, Loader, Paper, Popover, Select, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ArrowDown from "/public/icons/arrow-down.svg";
import ArrowRight from "/public/icons/arrow-right.svg";

import ConfirnStatus from "@/components/Attendance/ConfirmStatus";
import Vacation from "@/components/Attendance/Vacation";
import { TMyVacations } from "@/types/apiTypes";
import { monthList, yearsList } from "@/utils/dateFomat";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useRouter } from "next/navigation";
dayjs.locale("ko");
const items = [{ title: "휴가/연차 상세조회", href: "#" }].map((item, index) => (
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

  const router = useRouter();

  const [params, setParams] = useState<TMyVacations>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  });
  const { data, isLoading, isError } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => api.getMyVacations(params) });
  console.log("🚀 ~ page ~ data:", data);

  const vacations = data?.data.data;

  const [openedId, setOpenedId] = useState<number | null>(null);

  const [monthValue, setMonthValue] = useState<string | null>((dayjs().month() + 1).toString());
  const [yearValue, setYearValue] = useState<string | null>(dayjs().year().toString());
  const [isActive, setIsActive] = useState({
    yearSelect: false,
    monthSelect: false,
  });
  const selectMonth = (e: any) => {
    setParams((params) => ({ ...params, month: e }));
    setMonthValue(e);
    setIsActive((prev) => ({ ...prev, monthSelect: false }));
  };
  const selectYear = (e: any) => {
    setParams((params) => ({ ...params, year: e }));
    setYearValue(e);
    setIsActive((prev) => ({ ...prev, yearSelect: false }));
  };

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
      {/* <Breadcrumbs mb={"md"}>{items}</Breadcrumbs> */}

      <Stack gap={1}>
        <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>

      <Select
        mt={"md"}
        mb={2}
        comboboxProps={{
          withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
          // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
          transitionProps: { transition: "pop", duration: 200 },
        }}
        onChange={selectYear}
        value={yearValue}
        data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
        styles={{
          root: { width: "max-content" },
          input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
        }}
        dropdownOpened={isActive.yearSelect}
        onBlur={() => setIsActive((prev) => ({ ...prev, yearSelect: false }))}
        onClick={() => {
          setIsActive((prev) => ({ ...prev, yearSelect: true }));
        }}
      />

      <Flex gap={"md"} wrap={"wrap"}>
        <Paper bg={"white"} px="lg" py="md" radius={"lg"} h={"100%"}>
          <Group gap={"xl"}>
            <Stack gap={4}>
              <Popover width={"auto"} position="top-start" withArrow shadow="md">
                <Popover.Target>
                  <Group align="center" gap={4}>
                    <Text c={"dimmed"} fz={"xs"}>
                      입사일
                    </Text>
                    {/* <ThemeIcon variant="white">
                      <IconInfoCircle />
                    </ThemeIcon> */}
                  </Group>
                </Popover.Target>
                <Popover.Dropdown>
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
                </Popover.Dropdown>
              </Popover>
              <Text fw={600} ta={"center"} fz={"sm"}>
                2022-02-12
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                근속년수
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  2
                </Text>
                년
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                만 1년 날짜
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  2
                </Text>
                년
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                중도입사 연차 부여
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  7.25
                </Text>
                개
              </Text>
            </Stack>
          </Group>
        </Paper>

        <Paper bg={"white"} px="lg" py="md" h={"100%"} radius={"lg"}>
          <Group gap={"xl"}>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                총 연차 개수
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  20
                </Text>
                일
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                사용 연차
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  20
                </Text>
                일
              </Text>
            </Stack>
            <Stack gap={4}>
              <Text c={"dimmed"} fz={"xs"}>
                잔여 연차
              </Text>
              <Text fz={"sm"} ta={"center"}>
                <Text fw={600} component="span" fz={"md"}>
                  20
                </Text>
                일
              </Text>
            </Stack>
          </Group>
          {/* <Title order={5} mb={"xs"}>
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
            </Group> */}
        </Paper>
      </Flex>
      {/* 
      <DatePickerInput
        // label="조회기간"
        type="range"
        locale="ko"
        highlightToday
        firstDayOfWeek={0}
        clearable
        allowSingleDateInRange
        placeholder="조회일자를 선택해 주세요."
        miw={180}
        w={"max-content"}
        styles={{ input: { letterSpacing: 1, border: "none", paddingLeft: 25 }, section: { justifyContent: "start" } }}
        valueFormat="YYYY/MM/DD"
        leftSection={<IconCalendar />}
        onChange={dateSelect}
        value={dateValue}
        mt={"md"}
      /> */}

      <Select
        mt={"lg"}
        mb={2}
        comboboxProps={{
          withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
          // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
          transitionProps: { transition: "pop", duration: 200 },
        }}
        onChange={selectMonth}
        value={monthValue}
        data={monthList().map((item) => ({ value: item.toString(), label: `${item}월` }))}
        styles={{
          root: { width: "max-content" },
          input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
        }}
        dropdownOpened={isActive.monthSelect}
        onBlur={() => setIsActive((prev) => ({ ...prev, monthSelect: false }))}
        onClick={() => {
          setIsActive((prev) => ({ ...prev, monthSelect: true }));
        }}
      />

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        {isLoading ? (
          <Group justify="center" py={"xl"}>
            <Loader color="blue" type="dots" />
          </Group>
        ) : (
          <Stack py={"md"} gap={"lg"}>
            {vacations.length === 0 ? (
              <Group justify="center" py={"xl"}>
                <Text fz={"sm"} c={"gray.6"}>
                  조회된 내역이 없습니다.
                </Text>
              </Group>
            ) : (
              vacations?.map((record: any) => {
                const isOpen = openedId === record.commuteIdx;
                return (
                  <Stack key={record.commuteIdx} styles={{ root: { cursor: "pointer" } }}>
                    <Group gap={2} align="center" justify="space-between" wrap="nowrap" onClick={() => setOpenedId(isOpen ? null : record.commuteIdx)}>
                      <div className="flex flex-col">
                        <Text c={"dimmed"} fz={"xs"}>
                          {record.commuteDate}
                        </Text>
                        <Group py={4}>
                          <Text fz={"sm"}>{record.leaveType}</Text>
                          <Text fz={"sm"} component="span">
                            {record.attendance}
                          </Text>
                        </Group>
                        {/* {workTimeByLeaveType(record)} */}
                      </div>
                      {isOpen ? <ArrowDown /> : <ArrowRight />}
                    </Group>
                    <Collapse in={isOpen}>
                      <div className="flex gap-y-4 gap-x-8 flex-wrap items-end">
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            차감갯수
                          </Text>
                          <Text fz={"xs"}>{record.annualLeaveReduceUnit}</Text>
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            누적잔여
                          </Text>
                          <Text fz={"xs"}>{record.remainingAnnualLeaveQuota}</Text>
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            결재일자
                          </Text>
                          <ConfirnStatus record={record} />
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            결재자
                          </Text>
                          <Text fz={"xs"}>{record.confirmPersonName}</Text>
                        </Stack>

                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            내용
                          </Text>
                          {record.note ? (
                            <Text fz={"xs"}>{record.note}</Text>
                          ) : (
                            <Text fz={"xs"} c={"dimmed"}>
                              특이사항이 없습니다.
                            </Text>
                          )}
                        </Stack>
                        {record.confirmYN === "N" ? (
                          <Button variant="outline" color="red" size="xs">
                            신청취소
                          </Button>
                        ) : (
                          <Button variant="outline" color="gray" size="xs">
                            삭제
                          </Button>
                        )}
                      </div>
                    </Collapse>
                  </Stack>
                );
              })
            )}
          </Stack>
        )}
      </Paper>

      <Vacation opened={opened} close={close} />
    </Container>
  );
}

export default page;
