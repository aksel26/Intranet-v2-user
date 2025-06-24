import { Box, Divider, Group, Stack, Text } from "@mantine/core";
import { attendanceService } from "@/api/services/attendance/attendance.services";
import { useApiQuery } from "@/api/useApi";
import { LeavTypeBadge } from "@/components/common/badge/leave";
import { AttendanceBadge } from "@/components/common/badge/work";
import { calculateNumberToTime, formatTime } from "@/utils/date/format";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { SquarePen } from "lucide-react";
import React, { useState } from "react";
import UpdateNote from "./note";

const WorkList = ({ params }: any) => {
  const { data } = useApiQuery(["attendanceAll", params], () => attendanceService.getMyAttendance(params));
  console.log("data:", data);

  const [opened, { open, close }] = useDisclosure(false);
  const [setselectRow, setSetsetselectRow] = useState();
  const openModal = (record: any) => {
    setSetsetselectRow(record);
    open();
  };
  const ListWrapper = ({ records }: any) => {
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
        <Group gap={"xs"} align="center">
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

      <Group gap={"md"}>
        <Stack gap={"xs"} flex={1}>
          <Group gap={"xs"}>
            <Text fz={"sm"} c={"gray.5"}>
              출근시간
            </Text>
            {!record.checkInTime ? (
              <Text fz={"sm"} c={"gray.5"}>
                출근 전
              </Text>
            ) : (
              <Text fz={"sm"}>{formatTime(record.checkInTime)}</Text>
            )}
          </Group>
          <Group gap={"xs"}>
            <Text fz={"sm"} c={"gray.5"}>
              퇴근시간
            </Text>
            {!record.checkOutTime ? (
              <Text fz={"sm"} c={"gray.5"}>
                퇴근 전
              </Text>
            ) : (
              <Text fz={"sm"}>{formatTime(record.checkOutTime)}</Text>
            )}
          </Group>
        </Stack>
        <Stack gap={"xs"} flex={1}>
          <Group gap={"xs"}>
            <Text fz={"sm"} c={"gray.5"}>
              근무시간
            </Text>
            <Text fz={"sm"}>{`${calculateNumberToTime(record.workingMinutes)}`}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"sm"} c={"gray.5"}>
              초과시간
            </Text>
            <Text fz={"sm"}>{`${calculateNumberToTime(record.overtimeWorkingMinutes)}`}</Text>
          </Group>
        </Stack>
      </Group>
      <Group align="center" justify="space-between" styles={{ root: { cursor: "pointer" } }} onClick={() => openModal(record)}>
        <Group gap={"xs"}>
          <Text fz={"sm"} c={"gray.5"}>
            비고
          </Text>
          <Box w={"60vw"}>
            <Text truncate="end" c={record.note ? "black" : "gray.5"} fz={"sm"}>
              {record.note ? record.note : "내용이 없습니다."}
            </Text>
          </Box>
        </Group>
        <SquarePen size={14} strokeWidth={1.2} />
      </Group>
      {arr.length === index + 1 ? null : <Divider my={"sm"} color="gray.1" />}
    </Stack>
  );

  return (
    <>
      <ListWrapper records={data?.data.data.records} />
      <UpdateNote opened={opened} close={close} details={setselectRow} />
    </>
  );
};

export default WorkList;
