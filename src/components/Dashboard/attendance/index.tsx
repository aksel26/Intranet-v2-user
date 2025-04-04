import * as api from "@/app/api/get/getApi";
import { Badge, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react";
const AttendanceAll = ({ date }: { date: Date | string | null }) => {
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
      <Group>
        <Title order={5}>직원 근태 현황 </Title>
        <Text c={"dimmed"} fz={"sm"}>
          {dayjs(date).format("YYYY-MM-DD")}
        </Text>
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
