"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../../styles/calendar.css";
import { Paper } from "@mantine/core";
import { mealStore } from "@/lib/store/mealStore";
import { titleRender } from "@/utils/calendarFetch";
import dayjs from "dayjs";
import { currentDateStore } from "@/lib/store/dateStore";

export default function Calendar() {
  const { meals } = mealStore((state) => state.mealInfo);
  const { setCurrentDate } = currentDateStore((state) => state);
  const [calendarFormat, setCalendarFormat] = useState<any>();

  const renderEvent = () => {
    const calendarFormat = meals.map((item: any) => {
      if (item.holidayYN === "N") {
        return { start: item.start, title: titleRender(item.lunch.attendance) };
      } else {
        return { start: item.start, title: "공휴일" };
      }
    });

    setCalendarFormat(calendarFormat);
  };

  useEffect(() => {
    renderEvent();
  }, [meals]);

  return (
    <Paper p="sm" py={"lg"}>
      <FullCalendar
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,title,next",
          center: "", // 커스텀 버튼을 중앙에 배치
          right: "today",
        }}
        selectable
        showNonCurrentDates={false}
        fixedWeekCount={false}
        nowIndicator
        contentHeight={"auto"}
        buttonText={{
          today: "오늘",
        }}
        weekends={true}
        events={calendarFormat}
        eventClick={(info) => {
          if (info.event.start) setCurrentDate(info.event.start);
        }}
        height="auto"
        locale="ko"
        plugins={[dayGridPlugin]}
        dayCellContent={(arg) => arg.dayNumberText.replace("일", "")}
      />
    </Paper>
  );
}
