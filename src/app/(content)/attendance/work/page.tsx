"use client";
import * as api from "@/app/api/get/getApi";
import { TMyAttendance } from "@/types/apiTypes";
import { calculateNumberToTime, formatTime } from "@/utils/dateFomat";
import { Breadcrumbs, Collapse, Container, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import ArrowDown from "/public/icons/arrow-down.svg";
import ArrowRight from "/public/icons/arrow-right.svg";
import IconCalendar from "/public/icons/calendar.svg";
import { detectDevice } from "@/utils/userAgent";

const items = [{ title: "출퇴근 관리", href: "#" }].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));
function page() {
  const [params, setParams] = useState<TMyAttendance>({
    pageNo: 1,
    perPage: 31,
    sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([null, null]);

  const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", params], queryFn: () => api.getMyAttendance(params) });
  const records = data?.data?.data?.records;

  const [openedId, setOpenedId] = useState<number | null>(null);

  const workTimeByLeaveType = useCallback((record: any) => {
    if (record.leaveType === "연차") {
      return null;
    } else {
      const isIncomplete = !record.checkInTime || !record.checkOutTime;

      return (
        <Text fz={"xs"} c={isIncomplete ? "dimmed" : undefined}>
          {`${formatTime(record.checkInTime)} ~ ${formatTime(record.checkOutTime)}`}
          {!isIncomplete && (
            <Text fz={"xs"} component="span" ml={4}>
              {`(${calculateNumberToTime(record.workingMinutes).hours}시간 근무)`}
            </Text>
          )}
        </Text>
      );
    }
  }, []);

  const dateSelect = (val: [Date | null, Date | null]) => {
    const [sDate, eDate] = val;
    if (sDate && eDate) {
      setParams((prev) => ({ ...prev, sDate: dayjs(sDate).format("YYYY-MM-DD"), eDate: dayjs(eDate).format("YYYY-MM-DD") }));
    } else if (!sDate && !eDate) {
      setParams((prev) => ({ ...prev, sDate: dayjs().startOf("month").format("YYYY-MM-DD"), eDate: dayjs().endOf("month").format("YYYY-MM-DD") }));
    }
    setDateValue(val);
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
      <Stack gap={1}>
        <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 출퇴근 내역을 조회합니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
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
        />
        {isLoading ? (
          <Group justify="center" py={"xl"}>
            <Loader color="blue" type="dots" />
          </Group>
        ) : (
          <Stack py={"md"} gap={"xl"}>
            {records?.map((record: any) => {
              const isOpen = openedId === record.commuteIdx;
              return (
                <Stack key={record.commuteIdx} gap={2} styles={{ root: { cursor: "pointer" } }}>
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
                      {workTimeByLeaveType(record)}
                    </div>
                    {isOpen ? <ArrowDown /> : <ArrowRight />}
                  </Group>
                  <Collapse in={isOpen}>
                    <div className="flex gap-y-4 gap-x-8 flex-wrap">
                      <Stack gap={1}>
                        <Text fz={"xs"} c={"dimmed"}>
                          근무시간
                        </Text>
                        <Text fz={"xs"}>{`${calculateNumberToTime(record.workingMinutes).hours}시간 ${
                          calculateNumberToTime(record.workingMinutes).minutes
                        }분`}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text fz={"xs"} c={"dimmed"}>
                          초과시간
                        </Text>
                        <Text fz={"xs"}>{`${calculateNumberToTime(record.overtimeWorkingMinutes).minutes}분`}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text fz={"xs"} c={"dimmed"}>
                          출근기기
                        </Text>
                        <Text fz={"xs"}>{detectDevice(record.checkInLogAgent, record.checkInIpAddr)}</Text>
                      </Stack>
                      <Stack gap={1}>
                        <Text fz={"xs"} c={"dimmed"}>
                          퇴근기기
                        </Text>
                        <Text fz={"xs"}>{detectDevice(record.checkOutLogAgent, record.checkOutIpAddr)}</Text>
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
                    </div>
                  </Collapse>
                </Stack>
              );
            })}
          </Stack>
        )}
      </Paper>
    </Container>
  );
}

export default page;
