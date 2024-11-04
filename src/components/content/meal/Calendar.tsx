"use client";

import { mealStore } from "@/lib/store/mealStore";
import { titleRender } from "@/utils/calendarFetch";
import { CalendarApi } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { Paper } from "@mantine/core";
import dayjs from "dayjs";
import Hammer from "hammerjs";
import { useEffect, useRef, useState } from "react";
import "../../../styles/calendar.css";
import { useCombinedStore } from "@/lib/store/CombinedStore";
import { CalendarDate } from "@/lib/store/calendarDateStore";

export default function Calendar({ setCalendarYearMonth }: any) {
  const { meals } = mealStore((state) => state.mealInfo);
  const [calendarFormat, setCalendarFormat] = useState<any>();
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    // Hammer 인스턴스 생성
    const hammer = new Hammer(containerEl);

    // 수평 방향 스와이프만 감지하도록 설정
    hammer.get("swipe").set({
      direction: Hammer.DIRECTION_HORIZONTAL,
      threshold: 50,
    });

    // 스와이프 이벤트 핸들러
    hammer.on("swipeleft swiperight", (e: any) => {
      const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
      if (!calendarApi) return;

      if (e.type === "swiperight") {
        calendarApi.prev(); // 이전 달
      } else if (e.type === "swipeleft") {
        calendarApi.next(); // 다음 달
      }
    });

    // 클린업 함수
    return () => {
      hammer.destroy();
    };
  }, []);

  const handleDatesSet = (selectInfo: any) => {
    const { start } = selectInfo;

    const year = dayjs(start).year();
    const month = dayjs(start).month() + 1;

    setCalendarYearMonth((prev: any) => ({ ...prev, year: year, month: month }));

    // 날짜 선택 처리
  };

  const { calendarDateStore } = useCombinedStore() as { calendarDateStore: CalendarDate };

  const handleDateSelect = (arg: any) => {
    calendarDateStore.setCurrentCalendarDate(arg.start);
  };

  return (
    <Paper p="sm" py={"lg"} ref={containerRef}>
      <FullCalendar
        ref={calendarRef}
        datesSet={handleDatesSet}
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
          console.log(info.event);
          // if (info.event.start) setCurrentMealData(info.event.start);
        }}
        // dateClick={handleDateSelect}
        select={handleDateSelect}
        height="auto"
        locale="ko"
        plugins={[dayGridPlugin, interactionPlugin]}
        dayCellContent={(arg) => arg.dayNumberText.replace("일", "")}
      />
    </Paper>
  );
}
