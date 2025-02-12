import { Badge, Card, Divider, Group, Progress, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";
import IconWork from "/public/icons/briefcase.svg";
import IconTimer from "/public/icons/clock-hour-10.svg";
function Work({ myInfo }: any) {
  if (!myInfo.checkInTime) return null;
  return (
    <Card w={"100%"} mih={100} mt={"xs"} p={"xs"}>
      <Stack gap={3}>
        <Group justify="space-between">
          <Group gap={"xs"}>
            <IconWork />
            <Text fz={"sm"}>출근시간</Text>
          </Group>
          <Badge variant="light" radius={"sm"} size="md" fw={500}>
            정상출근
          </Badge>
        </Group>
        <Text pl={25} fz={"xs"}>
          {dayjs(myInfo.checkInTime).format("HH시 mm분 ss초")}
        </Text>
      </Stack>
      <Divider my={"xs"} />
      <Stack gap={3}>
        <Group gap={"xs"}>
          <IconTimer />
          <Text fz={"sm"}>경과시간</Text>
        </Group>

        <Text pl={25} fz={"xs"} mb={5}>
          {dayjs(myInfo.checkInTime).format("HH시 mm분 ss초")}
        </Text>
        <Progress value={50} />
      </Stack>
    </Card>
  );
}

export default Work;
