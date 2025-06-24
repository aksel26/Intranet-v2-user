// import { getAllAttendanceStaff, getHolidays } from "@/app/api/get/getApi";
// import EmptyView from "@/components/common/view/EmptyView";
// import { ErrorView } from "@/components/common/view/ErrorView";
// import LoadingView from "@/components/common/view/LoadingView";
// import { mainDateStore } from "@/lib/store/mainDateStore";
import { Stack } from "@mantine/core";

import dayjs from "dayjs";
import AttendanceAll from "./attendance";
import MainCalendar from "./calendar";
import { mainDateStore } from "@/store/mainDateStore";
import { useApiQuery } from "@/api/useApi";
import { attendanceService } from "@/api/services/attendance/attendance.services";

const CalendarAttendance = () => {
  const { dateValue } = mainDateStore();

  const { data, isLoading, isError } = useApiQuery(["attendanceAllStaff", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }], () =>
    attendanceService.getUsersAttendance({
      year: dayjs(dateValue).year().toString(),
      month: (dayjs(dateValue).month() + 1).toString(),
    })
  );

  console.log("data: ", data);

  const allAttendance = data?.data.data;

  const renderContent = () => {
    if (isLoading) return "로딩중";
    // if (isError)
    //   return (
    //     <ErrorView>근태 내역을 불러오는 중 문제가 발생하였습니다.</ErrorView>
    //   );
    // if (allAttendance?.length === 0) return <EmptyView />;
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
