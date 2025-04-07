import * as api from "@/app/api/get/getApi";
import { Badge, Button, Divider, Group, Indicator, Paper, Stack, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";
import { DatePicker } from "@mantine/dates";
const MainCalendar = ({ dateValue, setDateValue }: any) => {
  //   const router = useRouter();
  //   const goWorkDetails = () => router.push("/attendance/work");

  //   const { data, isLoading, isError } = useQuery({
  //     queryKey: ["attendanceAll", { date: dayjs(dateValue).format("YYYY-MM-DD") }],
  //     queryFn: () => api.getAllAttendance({ date: dayjs(dateValue).format("YYYY-MM-DD") }),
  //   });
  //   console.log("🚀 ~ MainCalendar ~ data:", data);

  //   const [leaveList, setLeaveList] = useState(false);

  //   useEffect(() => {
  //     if (data) {
  //       if (isEmpty(data?.data.data.leaveByType)) {
  //         setLeaveList(false);
  //       } else {
  //         setLeaveList(data?.data.data.leaveByType);
  //       }
  //     }
  //   }, [data]);

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Title order={5} mb={"md"}>
        캘린더
      </Title>
      <DatePicker
        highlightToday
        locale="ko"
        value={dateValue}
        onChange={setDateValue}
        onMonthSelect={() => console.log("🙏")}
        onNextMonth={setDateValue}
        onPreviousMonth={setDateValue}
        firstDayOfWeek={0}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"
      />
    </Paper>
  );
};

export default MainCalendar;
