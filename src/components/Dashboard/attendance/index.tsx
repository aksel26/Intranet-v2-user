import * as api from "@/app/api/get/getApi";
import { Button, Group, Paper, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import ArrowRight from "/public/icons/arrow-right.svg";

const AttendanceAll = () => {
  const router = useRouter();
  const goNotice = () => router.push("/notice");
  const date = dayjs().format("YYYY-MM-DD");

  const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", { date: date }], queryFn: () => api.getAllAttendance({ date: date }) });

  console.log("🚀 ~ AttendanceAll ~ data:", data);
  return (
    <Paper p={"lg"} radius={"lg"}>
      <Group justify="space-between" align="flex-start">
        <Group>
          <Title order={5}>직원 근태 현황 </Title>
          <Text c={"dimmed"} fz={"sm"}>
            {dayjs().format("YYYY-MM-DD")}
          </Text>
        </Group>
        <Button size="xs" variant="subtle" onClick={goNotice} rightSection={<ArrowRight />}>
          나의 근태 현황 보기
        </Button>
      </Group>

      <Text c={"dimmed"} fz={"sm"} ta={"center"} my={"md"}>
        근태 내역이 없습니다.
      </Text>
      {/* {data?.data.data.leaveList.length < 1 ? (
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
      )} */}
    </Paper>
  );
};

export default AttendanceAll;
