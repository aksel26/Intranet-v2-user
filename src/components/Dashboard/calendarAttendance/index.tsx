import { getAllAttendanceStaff } from "@/app/api/get/getApi";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { Group, Loader, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import AttendanceAll from "./attendance";
import MainCalendar from "./calendar";

const CalendarAttendance = () => {
  const { dateValue } = mainDateStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceAllStaff", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }],
    queryFn: () => getAllAttendanceStaff({ month: (dayjs(dateValue).month() + 1).toString(), year: dayjs(dateValue).year().toString() }),
  });

  const allAttendance = data?.data?.data;

  const LoadingView = () => (
    <Group justify="center" py={"lg"}>
      <Loader size={"sm"} />
    </Group>
  );
  const EmptyView = () => (
    <Text ta={"center"} c={"dimmed"} fz={"xs"} py={"lg"}>
      등록된 내역이 없어요.
    </Text>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (allAttendance?.length === 0) return <EmptyView />;
    return (
      <Stack>
        <MainCalendar allAttendance={allAttendance} />
        <AttendanceAll allAttendance={allAttendance} />
      </Stack>
    );
  };
  return <>{renderContent()}</>;
};

export default CalendarAttendance;
