import { getAllAttendanceStaff } from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import AttendanceAll from "./attendance";
import MainCalendar from "./calendar";

const CalendarAttendance = () => {
  const { dateValue } = mainDateStore();
  console.log("🚀 ~ CalendarAttendance ~ dateValue:", dateValue);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceAllStaff", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }],
    queryFn: () => getAllAttendanceStaff({ month: (dayjs(dateValue).month() + 1).toString(), year: dayjs(dateValue).year().toString() }),
  });

  const allAttendance = data?.data?.data;

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>근태 내역을 불러오는 중 문제가 발생하였습니다.</ErrorView>;
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
