"use client";
import * as api from "@/app/api/get/getApi";
import { AttendanceBadge, LeavTypeBadge } from "@/components/Attendance/work/badge";
import DatePicker from "@/components/Attendance/work/datePicker";
import WorkTimeByLeaveType from "@/components/Attendance/work/workTime";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { TMyAttendance } from "@/types/apiTypes";
import { calculateNumberToTime } from "@/utils/dateFomat";
import { detectDevice } from "@/utils/userAgent";
import { Breadcrumbs, Container, Divider, Group, Paper, Space, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";

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

  const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", params], queryFn: () => api.getMyAttendance(params) });
  const records = data?.data?.data?.records;
  console.log("🚀 ~ page ~ records:", records);

  const ListWrapper = () => {
    return (
      <>
        {records?.map((record: any, index: number, arr: any) => {
          return (
            <React.Fragment key={index}>
              <Items key={record.noticeIdx} record={record} arr={arr} index={index} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const Items = ({ record, arr, index }: { record: any; arr: any; index: number }) => (
    <Stack key={record.commuteIdx} gap={8}>
      <Group gap={2} align="center" justify="space-between" wrap="nowrap">
        <Stack gap={4}>
          <Text fz={"sm"} fw={600}>
            {dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}
          </Text>
          <Group py={4}>
            <LeavTypeBadge leaveType={record.leaveType} />
            <AttendanceBadge attendance={record.attendance} />
            <WorkTimeByLeaveType record={record} />
          </Group>
        </Stack>
      </Group>

      <div className="flex gap-y-4 gap-x-8 flex-wrap">
        <Stack gap={1}>
          <Text fz={"xs"} c={"dimmed"}>
            근무시간
          </Text>
          <Text fz={"xs"}>{`${calculateNumberToTime(record.workingMinutes)}`}</Text>
        </Stack>
        <Stack gap={1}>
          <Text fz={"xs"} c={"dimmed"}>
            초과시간
          </Text>
          <Text fz={"xs"}>{`${calculateNumberToTime(record.overtimeWorkingMinutes)}`}</Text>
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
      {arr.length === index + 1 ? null : <Divider my={"xl"} color="gray.1" />}
    </Stack>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>출퇴근 내역 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (records?.length === 0) return <EmptyView />;
    return <ListWrapper />;
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
        <DatePicker setParams={setParams} />
        <Space h={"md"} />
        {renderContent()}
      </Paper>
    </Container>
  );
}

export default page;
