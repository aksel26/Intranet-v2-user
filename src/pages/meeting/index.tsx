import { meetingService } from "@/api/services/meeting/meeting.services";
import { useApiQuery } from "@/api/useApi";
import HorizontalTimeline from "@/components/meeting/horizontal";
import VerticalTimeline from "@/components/meeting/vertical";
import type { TMeeting } from "@/types/meeting";
// import { TMeeting } from "@/types/meeting";
import { formatYYYYMMDD } from "@/utils/date/format";
import { Group, Loader, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { MoveHorizontal, MoveVertical } from "lucide-react";
import { useEffect, useState } from "react";

const Meeting = () => {
  const [currentView, setCurrentView] = useState("resourceTimeline");

  // 일정 목록 인쇄

  const [meetingDate, setMeetingDate] = useState(formatYYYYMMDD(dayjs().toDate()));

  const { data, isLoading, isError } = useApiQuery(["meeting", { date: meetingDate }], () => meetingService.getMeetings({ meetingDate: meetingDate }));

  const [meetings, setMeetings] = useState([]);
  console.log("meetings:", meetings);

  useEffect(() => {
    if (data) {
      const result = data?.data.data;

      const converted = result.map((item: TMeeting) => ({
        id: item.reservationIdx,
        resourceId: item.roomId,
        title: item.title,
        start: dayjs(item.start).toDate(),
        end: dayjs(item.end).toDate(),
        description: item.description,
        attendeeInfo: item.attendeeInfo,
        ccUserInfo: item.ccUserInfo,
        meetingType: item.meetingType,
        content: item.content,
        writerName: item.writerName,
      }));

      setMeetings(converted);
    }
  }, [data]);

  if (isLoading)
    return (
      <Group justify="center" align="center">
        <Loader size={18} type="dots" />
      </Group>
    );

  return (
    <>
      {" "}
      <Group justify="space-between" align="center" mb={"md"}>
        <Stack gap={1}>
          <Title order={4}>회의실 예약</Title>
          <Text c={"gray.6"} fz={"sm"}>
            회의 일정을 예약할 수 있습니다.
          </Text>
        </Stack>

        <Switch
          label="보기 설정"
          styles={{
            body: { flexDirection: "column-reverse", justifyContent: "center" },
            label: {
              padding: 0,
              fontSize: "12px",
              color: "var(--mantine-color-gray-6)",
            },
          }}
          onChange={() => {
            setCurrentView(currentView === "resourceTimeline" ? "resourceTimeGrid" : "resourceTimeline");
          }}
          size="md"
          color="gray.2"
          onLabel={<MoveVertical size={16} strokeWidth={2.5} color="var(--mantine-color-blue-6)" />}
          offLabel={<MoveHorizontal size={16} strokeWidth={2.5} color="var(--mantine-color-blue-6)" />}
        />
      </Group>
      <Paper bg={"white"} px="lg" py="xl" radius={"lg"} mt={"md"}>
        {currentView === "resourceTimeline" ? <HorizontalTimeline details={meetings} /> : <VerticalTimeline />}
      </Paper>
      {/* <ReserveModal opened={opened} close={close} /> */}
    </>
  );
};

export default Meeting;
