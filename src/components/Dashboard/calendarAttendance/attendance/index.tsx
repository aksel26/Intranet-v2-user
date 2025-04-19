import { mainDateStore } from "@/lib/store/mainDateStore";
import { TAttendance } from "@/lib/types/attendance";
import { Badge, Group, Paper, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const AttendanceAll = ({ allAttendance }: any) => {
  const { dateValue } = mainDateStore();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    // 선택된 날짜를 YYYY-MM-DD 형식으로 변환
    const dateStr = dayjs(dateValue).format("YYYY-MM-DD");

    // 해당 날짜의 이벤트 데이터만 필터링
    const events = allAttendance[dateStr] || [];
    setFilteredEvents(events);
  }, [allAttendance, dateValue]);

  if (!filteredEvents) return null;

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Group>
        <Title order={5}>직원 근태 현황 </Title>
        <Text c={"dimmed"} fz={"sm"}>
          {dayjs(dateValue).format("YYYY-MM-DD")}
        </Text>
      </Group>
      {filteredEvents.length === 0 ? (
        <Text c={"dimmed"} fz={"sm"} ta={"center"} my={"md"}>
          근태 내역이 없습니다.
        </Text>
      ) : (
        <Stack gap={"sm"} mt={"md"}>
          {filteredEvents.map((list: TAttendance, idx: number, arr: any) => {
            return (
              <Group key={idx}>
                <Badge variant="dot" size="md" color={list.confirmYN === "N" ? "yellow" : "lime"} radius={"md"}>
                  {list.leaveType}
                </Badge>
                <Text fz={"xs"}>{list.userName}</Text>
                <Text c={"dimmed"} fz={"xs"}>
                  {list.confirmYN === "N" ? "미승인" : "승인"}
                </Text>
              </Group>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default AttendanceAll;
