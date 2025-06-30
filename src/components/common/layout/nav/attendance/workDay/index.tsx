import { Badge, Card, Group, Progress, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import "@/styles/checkout.css";
import { Briefcase, ThumbsUp, Timer } from "lucide-react";
import { useCheckInProgress } from "@/hooks/useCheckInProgress";
import { myInfoStore } from "@/store/myInfoStore";
import { calculateNumberToTime } from "@/utils/date/format";
import CommuteButton from "../buttons";
function Work() {
  const { myInfo } = myInfoStore();
  console.log("myInfo:", myInfo);

  const { percentage, remainingTime, elapsedTime, isCheckOutAvailable, isBeforeCheckIn } = useCheckInProgress(myInfo?.checkInTime, myInfo?.availCheckOutTime, {
    updateInterval: 1000, // 1초마다 업데이트
    timezone: "Asia/Seoul", // 한국 시간대 설정 (선택사항)
  });

  return (
    <Stack gap={0}>
      <Card w={"100%"} mih={100} mt={"xs"} p={"xs"} pos={"relative"}>
        <Stack pos={"absolute"} top={10} right={10} gap={"xs"} align="end">
          <Badge variant="light" radius={"sm"} size="md" fw={500} color={myInfo?.attendance?.includes("지각") ? "yellow" : "blue"}>
            {myInfo?.attendance}
          </Badge>
          {myInfo?.leave.map((leave, index) => (
            <Badge key={index} variant="light" radius={"sm"} size="md" fw={500} color="green">
              <Text fz={"sm"}>
                {leave.leaveType}
                <Text fz={"xs"} component="span" ml={2} hidden={leave.confirmYN === "Y" ? true : false}>
                  (미)
                </Text>
              </Text>
            </Badge>
          ))}
        </Stack>
        <Stack gap={3} mb={"lg"}>
          <Group justify="space-between">
            <Group gap={"xs"}>
              <Briefcase color="#858e96" />
              <Text fz={"sm"} c={"dimmed"}>
                출근시간
              </Text>
            </Group>
          </Group>
          <Text pl={25} fz={"sm"} styles={{ root: { letterSpacing: "0.5px" } }}>
            {dayjs(myInfo?.checkInTime).format("HH시 mm분 ss초")}
          </Text>
        </Stack>
        {myInfo?.attendance?.includes("퇴근") ? (
          <Stack gap={3}>
            <Group gap={"xs"}>
              <Timer color="#858e96" />
              <Text fz={"sm"} c={"dimmed"}>
                총 근무시간
              </Text>
            </Group>

            <Text pl={25} fz={"sm"} mb={5} styles={{ root: { letterSpacing: "0.5px" } }}>
              {calculateNumberToTime(myInfo?.workingMinutes)}
            </Text>
          </Stack>
        ) : (
          <Stack gap={3}>
            <Group justify="space-between">
              <Group gap={"xs"}>
                <Timer color="#858e96" />
                <Text fz={"sm"} c={"dimmed"}>
                  경과시간
                </Text>
              </Group>

              <Badge className="isCheckout" color="lime" variant="light" hidden={!isCheckOutAvailable} leftSection={<ThumbsUp strokeWidth={2.5} size={15} />}>
                퇴근가능
              </Badge>
            </Group>

            <Text pl={25} fz={"sm"} mb={5} styles={{ root: { letterSpacing: "0.5px" } }}>
              {elapsedTime.formatted}
            </Text>
            <Progress value={percentage} />
          </Stack>
        )}
      </Card>
      <CommuteButton />
    </Stack>
  );
}

export default Work;
