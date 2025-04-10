"use client";
import { useElapsedTime } from "@/hooks/useElapsedTime";
import useTimeByLeaveType from "@/hooks/useTimeByLeaveType";
import { calculateNumberToTime } from "@/utils/dateFomat";
import { Badge, Card, Group, Progress, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import IconWork from "/public/icons/briefcase.svg";
import IconTimer from "/public/icons/clock-hour-10.svg";
function Work({ myInfo }: any) {
  const totalTime = useTimeByLeaveType(myInfo.leaveTypeIdx);
  const { elapsedTime, percentage } = useElapsedTime(myInfo.checkInTime, totalTime);

  if (!myInfo.checkInTime) return null;

  return (
    <Card w={"100%"} mih={100} mt={"xs"} p={"xs"}>
      <Stack gap={3} mb={"lg"}>
        <Group justify="space-between">
          <Group gap={"xs"}>
            <IconWork color="#858e96" />
            <Text fz={"sm"} c={"dimmed"}>
              출근시간
            </Text>
          </Group>
          <Badge variant="light" radius={"sm"} size="md" fw={500} color={myInfo.attendance.includes("지각") ? "yellow" : "blue"}>
            {myInfo.attendance}
          </Badge>
        </Group>
        <Text pl={25} fz={"xs"} styles={{ root: { letterSpacing: "0.5px" } }}>
          {dayjs(myInfo.checkInTime).format("HH시 mm분 ss초")}
        </Text>
      </Stack>
      {myInfo.attendance.includes("퇴근") ? (
        <Stack gap={3}>
          <Group gap={"xs"}>
            <IconTimer color="#858e96" />
            <Text fz={"sm"} c={"dimmed"}>
              총 근무시간
            </Text>
          </Group>

          <Text pl={25} fz={"xs"} mb={5} styles={{ root: { letterSpacing: "0.5px" } }}>
            {calculateNumberToTime(myInfo.workingMinutes).hours}시간 {calculateNumberToTime(myInfo.workingMinutes).minutes}분
          </Text>
        </Stack>
      ) : (
        <Stack gap={3}>
          <Group gap={"xs"}>
            <IconTimer color="#858e96" />
            <Text fz={"sm"} c={"dimmed"}>
              경과시간
            </Text>
          </Group>

          <Text pl={25} fz={"xs"} mb={5} styles={{ root: { letterSpacing: "0.5px" } }}>
            {elapsedTime}
          </Text>
          <Progress value={percentage} />
        </Stack>
      )}
    </Card>
  );
}

export default Work;
