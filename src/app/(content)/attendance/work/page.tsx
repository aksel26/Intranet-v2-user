"use client";
import * as api from "@/app/api/get/getApi";
import { AttendanceBadge, LeavTypeBadge } from "@/components/Attendance/work/badge";
import DatePicker from "@/components/Attendance/work/datePicker";
import WorkTimeByLeaveType from "@/components/Attendance/work/workTime";
import PageContainer from "@/components/Global/container";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { TMyAttendance } from "@/types/apiTypes";
import { calculateNumberToTime, formatTime } from "@/utils/dateFomat";
import { detectDevice } from "@/utils/userAgent";
import { Divider, Group, Paper, Space, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";

function page() {
  const [params, setParams] = useState<TMyAttendance>({
    pageNo: 1,
    perPage: 31,
    sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", params], queryFn: () => api.getMyAttendance(params) });
  const records = data?.data?.data?.records;

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
    <Stack key={record.commuteIdx} gap={10}>
      <Group gap={2} align="center" justify="space-between" wrap="nowrap">
        <Group gap={"xs"} align="end">
          <Text fz={"sm"} fw={500}>
            {dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}
          </Text>
          <Group>
            <LeavTypeBadge leaveType={record.leaveType} />
            <AttendanceBadge attendance={record.attendance} />
            {/* <WorkTimeByLeaveType record={record} /> */}
          </Group>
        </Group>
      </Group>

      <div className="flex gap-y-4 gap-x-8 flex-wrap">
        <Stack gap={1}>
          <Text fz={"xs"} c={"dimmed"}>
            출근시간
          </Text>
          <Text fz={"xs"}>{formatTime(record.checkInTime)}</Text>
        </Stack>
        <Stack gap={1}>
          <Text fz={"xs"} c={"dimmed"}>
            퇴근시간
          </Text>
          {!record.checkOutTime ? (
            <Text fz={"xs"} c={"gray.4"}>
              퇴근 전
            </Text>
          ) : (
            <Text fz={"xs"}>{formatTime(record.checkOutTime)}</Text>
          )}
        </Stack>
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
      </div>
      {arr.length === index + 1 ? null : <Divider my={"lg"} color="gray.1" />}
    </Stack>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>출퇴근 내역 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (records?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return (
    <PageContainer>
      <Stack gap={1}>
        <Text size="lg" fw={600}>
          출퇴근 관리
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 출퇴근 내역을 조회합니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
        <DatePicker setParams={setParams} />
        <Space h={"md"} />
        {renderContent()}
      </Paper>
    </PageContainer>
  );
}

export default page;
