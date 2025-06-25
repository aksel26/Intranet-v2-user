// import { mainDateStore } from "@/lib/store/mainDateStore";
// import { TAttendance } from "@/lib/types/attendance";
import { mainDateStore } from "@/store/mainDateStore";
import type { TAttendance } from "@/types/attendance";
import {
  Badge,
  Box,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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
    setFilteredEvents(events.filter((event: any) => event.confirmYN !== "R"));
  }, [allAttendance, dateValue]);

  if (!filteredEvents) return null;

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Group>
        <Group gap={"xs"}>
          <Title order={5}>직원 근태 현황 </Title>
          <Text fz={"sm"} c={"gray"}>
            ({filteredEvents.length}건)
          </Text>
        </Group>
        <Text c={"dimmed"} fz={"sm"}>
          {dayjs(dateValue).format("YYYY-MM-DD")}
        </Text>
      </Group>
      {filteredEvents.length === 0 ? (
        <Text c={"dimmed"} fz={"xs"} ta={"center"} my={"md"}>
          근태 내역이 없습니다.
        </Text>
      ) : (
        <ScrollArea h={180} mt={"md"}>
          <Stack gap={"xs"}>
            {filteredEvents.map((list: TAttendance, idx: number, arr: any) => {
              if (list.confirmYN === "R") return null;
              return (
                <Group key={idx} gap={"xs"}>
                  <Box w={45}>
                    <Badge
                      variant="light"
                      size="sm"
                      color={list.confirmYN === "N" ? "yellow" : "lime"}
                      radius={"sm"}
                    >
                      {list.confirmYN === "N" ? "미승인" : "승인"}
                    </Badge>
                  </Box>
                  <Text miw={40} fz={"sm"}>
                    {list.userName}
                  </Text>
                  <Text c={"dimmed"} fz={"sm"}>
                    {list.leaveType}
                  </Text>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea>
      )}
    </Paper>
  );
};

export default AttendanceAll;
