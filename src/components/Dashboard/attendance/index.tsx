import * as api from "@/app/api/get/getApi";
import { Badge, Button, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";
const AttendanceAll = ({ date }: { date: Date | string | null }) => {
  const router = useRouter();
  const goWorkDetails = () => router.push("/attendance/work");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceAll", { date: dayjs(date).format("YYYY-MM-DD") }],
    queryFn: () => api.getAllAttendance({ date: dayjs(date).format("YYYY-MM-DD") }),
  });

  const [leaveList, setLeaveList] = useState(false);

  useEffect(() => {
    if (data) {
      if (isEmpty(data?.data.data.leaveByType)) {
        setLeaveList(false);
      } else {
        setLeaveList(data?.data.data.leaveByType);
      }
    }
  }, [data]);

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Group justify="space-between" align="flex-start">
        <Group>
          <Title order={5}>직원 근태 현황 </Title>
          <Text c={"dimmed"} fz={"sm"}>
            {dayjs(date).format("YYYY-MM-DD")}
          </Text>
        </Group>
        <Button size="xs" variant="subtle" onClick={goWorkDetails} rightSection={<ArrowRight />}>
          나의 근태 현황 보기
        </Button>
      </Group>
      {!leaveList ? (
        <Text c={"dimmed"} fz={"sm"} ta={"center"} my={"md"}>
          근태 내역이 없습니다.
        </Text>
      ) : (
        <Stack gap={"sm"} mt={"md"}>
          {Object.entries(leaveList).map((list: any, idx: number) => {
            return (
              <Group key={idx}>
                <Badge size="sm">{list[0]}</Badge>

                <Group gap={7}>
                  {list[1].map((name: string, index: number, arr: any) => (
                    <Fragment key={index}>
                      <Text fz={"sm"}>{name}</Text>
                      {arr.length === index + 1 ? null : <Divider orientation="vertical" />}
                    </Fragment>
                  ))}
                </Group>
              </Group>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default AttendanceAll;
