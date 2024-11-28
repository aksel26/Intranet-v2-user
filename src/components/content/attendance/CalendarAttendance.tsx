"use client";
import { Indicator } from "@mantine/core";
import { Calendar } from "@mantine/dates";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

function CalendarAttendance() {
  return (
    <Calendar
      highlightToday
      locale="ko"
      firstDayOfWeek={0}
      style={{ width: "100%", height: "100%" }}
      styles={{ month: { width: "100%" }, calendarHeader: { maxWidth: "unset" }, monthCell: { padding: "var(--mantine-spacing-xs)" } }}
      renderDay={(date) => {
        const day = date.getDate();
        const isToday = dayjs(date).isSame(dayjs(), "day");
        if (day === 14) {
          return (
            <Indicator color="yellow" position="top-end" size={10} offset={-5}>
              <div>{day}</div>
            </Indicator>
          );
        }
        if (day === 15) {
          return (
            <Indicator color="blue" position="top-end" size={10} offset={-5}>
              <div>{day}</div>
            </Indicator>
          );
        }
        return (
          <Indicator color="yellow" position="top-end" size={12} processing offset={-5} disabled={!isToday}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
    // <FullCalendar
    //   // ref={calendarRef}
    //   // datesSet={handleDatesSet}
    //   initialView="dayGridMonth"
    //   headerToolbar={{
    //     left: "prev,title,next",
    //     center: "", // 커스텀 버튼을 중앙에 배치
    //     right: "today",
    //   }}
    //   selectable
    //   showNonCurrentDates={false}
    //   fixedWeekCount={false}
    //   nowIndicator
    //   contentHeight={"auto"}
    //   buttonText={{
    //     today: "오늘",
    //   }}
    //   weekends={true}
    //   events={[
    //     { start: "2024-11-24", title: "출근" },
    //     { start: "2024-11-25", title: "출근" },
    //     { start: "2024-11-26", title: "출근" },
    //     { start: "2024-11-28", title: "출근" },
    //     { start: "2024-11-27", title: "출근" },
    //   ]}
    //   // eventClick={(info) => {
    //   //   if (info.event.start) calendarDateStore.setCurrentCalendarDate(info.event.start);
    //   // }}
    //   // dateClick={handleDateSelect}
    //   // select={handleDateSelect}
    //   height="auto"
    //   locale="ko"
    //   plugins={[dayGridPlugin]}
    //   dayCellContent={(arg) => arg.dayNumberText.replace("일", "")}
    // />
  );
}

export default CalendarAttendance;
