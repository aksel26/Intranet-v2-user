import { ActionIcon, Badge, Button, Container, Divider, Grid, GridCol, Group, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import React, { useCallback } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";
import { useRouter } from "next/navigation";
import * as api from "@/app/api/get/getApi";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const AttendanceAll = () => {
  const router = useRouter();
  const goNotice = () => router.push("/notice");
  const date = dayjs().format("YYYY-MM-DD");

  const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", { date: date }], queryFn: () => api.getAllAttendance({ date: date }) });

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Group justify="space-between" align="flex-start">
        <Title order={5}>직원 근태 현황 {data?.data.data.leaveList.length}</Title>
        <Button size="xs" variant="subtle" onClick={goNotice} rightSection={<ArrowRight />}>
          나의 근태 현황 보기
        </Button>
      </Group>

      {data?.data.data.leaveList.length < 1 ? (
        <Text c={"dimmed"} fz={"sm"} ta={"center"} my={"md"}>
          특이사항이 없습니다.
        </Text>
      ) : (
        <Stack gap={"sm"} mt={"md"}>
          {data?.data.data.leaveList.map((leave: any) => (
            <Group>
              <Badge size="sm">{leave.leaveType}</Badge>
              <Group gap={7}>
                <Text fz={"sm"}>{leave.userName}</Text>
                <Divider orientation="vertical" />
                <Text fz={"sm"}>김정순</Text>
                <Divider orientation="vertical" />
                <Text fz={"sm"}>김정순</Text>
              </Group>
            </Group>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default AttendanceAll;
