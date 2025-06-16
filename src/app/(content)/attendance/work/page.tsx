"use client";
import DatePicker from "@/components/Attendance/work/datePicker";
import AttendanceList from "@/components/Attendance/work/list";
import { TMyAttendance } from "@/types/apiTypes";
import { Paper, Space } from "@mantine/core";
import dayjs from "dayjs";
import { Suspense, useState } from "react";
import Loading from "../loading";
import ScrollToTop from "@/components/Global/scrollToTop";

function page() {
  const [params, setParams] = useState<TMyAttendance>({
    pageNo: 1,
    perPage: 31,
    sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  return (
    <>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
        <DatePicker setParams={setParams} />
        <Space h={"md"} />
        <Suspense fallback={<Loading />}>
          <AttendanceList params={params} />
        </Suspense>
        <ScrollToTop />
      </Paper>
    </>
  );
}

export default page;
