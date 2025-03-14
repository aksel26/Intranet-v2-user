import * as api from "@/app/api/get/getApi";
import { Divider, Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
const AttendanceSummary = () => {
  const currentYear = dayjs().year();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceSummary", { year: currentYear }],
    queryFn: () => api.getAttendanceSummary({ year: currentYear }),
  });
  return (
    <Group gap={"sm"} justify="space-evenly">
      <Stack gap={4}>
        <Text fz={"sm"}>총 연차 수</Text>
        <Text fz={"sm"} ta={"center"}>
          <Text fw={900} component="span" fz={"xl"}>
            20
          </Text>
          일
        </Text>
      </Stack>
      <Divider orientation="vertical" />
      <Stack gap={4}>
        <Text fz={"sm"}>사용 연차 수</Text>
        <Text fz={"sm"} ta={"center"}>
          <Text fw={900} component="span" fz={"xl"}>
            20
          </Text>
          일
        </Text>
      </Stack>
      <Divider orientation="vertical" />
      <Stack gap={4}>
        <Text fz={"sm"}>잔여 연차 수</Text>
        <Text fz={"sm"} ta={"center"}>
          <Text fw={900} component="span" fz={"xl"}>
            20
          </Text>
          일
        </Text>
      </Stack>
      <Divider orientation="vertical" />
      <Stack gap={4}>
        <Text fz={"sm"}>미승인 요청건</Text>
        <Text fz={"sm"} ta={"center"}>
          <Text fw={900} component="span" fz={"xl"}>
            2
          </Text>
          건
        </Text>
      </Stack>
    </Group>
  );
};

export default AttendanceSummary;
