import HorizontalTimeline from "@/components/room/horizontal";
import VerticalTimeline from "@/components/room/vertical";
import { Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { MoveHorizontal, MoveVertical } from "lucide-react";
import { useState } from "react";

const Room = () => {
  const [currentView, setCurrentView] = useState("resourceTimeline");

  // 일정 목록 인쇄

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
        {currentView === "resourceTimeline" ? <HorizontalTimeline /> : <VerticalTimeline />}
      </Paper>
      {/* <ReserveModal opened={opened} close={close} /> */}
    </>
  );
};

export default Room;
