"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "../../../styles/calendar.css";

export default function Calendar() {
  return (
    <>
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
        events={[
          { title: "이벤트 1", date: "2024-09-01" },
          { title: "이벤트 2", start: "2024-09-05" },
        ]}
        eventClick={(info) => {
          alert("Event: " + info.event.title);
        }}
        height="auto"
        locale="ko"
        plugins={[dayGridPlugin]}
        dayCellContent={(arg) => arg.dayNumberText.replace("일", "")}
      />
    </>
  );
}
