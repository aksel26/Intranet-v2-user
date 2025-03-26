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
        firstDayOfWeek={0}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"

        // styles={{
        //   month: { width: "100%" },
        //   calendarHeader: { maxWidth: "unset" },
        //   day: { width: "100%", height: 60 },
        // }}
        // renderDay={(date) => {
        //   const day = date.getDate();
        //   const isToday = dayjs(date).isSame(dayjs(dateValue), "day");
        //   console.log("🚀 ~ MainCalendar ~ isToday:", day, isToday);
        //   return (
        //     <Indicator label="+3" size={16} offset={-8} inline color="green.5">
        //       <div>{day}</div>
        //     </Indicator>
        //   );

        //   //   return (
        //   //     <Indicator color="yellow" position="top-end" size={12} processing offset={-5} disabled={!isToday}>
        //   //       <div>{day}</div>
        //   //     </Indicator>
        //   //   );
        // }}
      />
    </Paper>
  );
};

export default MainCalendar;
