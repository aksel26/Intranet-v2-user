"use client";

import { mealStore } from "@/lib/store/mealStore";
import { titleRender } from "@/utils/calendarFetch";
import { CalendarApi } from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import FullCalendar from "@fullcalendar/react";
import { Divider, Indicator, Paper, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import Hammer from "hammerjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "../../../styles/calendar.css";
import { useCombinedStore } from "@/lib/store/CombinedStore";
import { CalendarDate } from "@/lib/store/calendarDateStore";
import { Detail } from "@/components/detail/Detail";
import { DatePicker } from "@mantine/dates";
import { calendarIcon } from "@/utils/meal/calendarIcon";

export default function Calendar({ meals }: any) {
  console.log("🚀 ~ Calendar ~ meals:", meals);
  // const { meals } = mealStore((state) => state.mealInfo);
  const [calendarFormat, setCalendarFormat] = useState<any>();
  const calendarRef = useRef<FullCalendar>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // const renderEvent = () => {
  //   const calendarFormat = meals.map((item: any) => {
  //     if (item.holidayYN === "N") {
  //       return { start: item.start, title: titleRender(item.lunch.attendance) };
  //     } else {
  //       return { start: item.start, title: "공휴일" };
  //     }
  //   });

  //   setCalendarFormat(calendarFormat);
  // };

  // useEffect(() => {
  //   renderEvent();
  // }, [meals]);

  // useEffect(() => {
  //   const containerEl = containerRef.current;
  //   if (!containerEl) return;

  //   // Hammer 인스턴스 생성
  //   const hammer = new Hammer(containerEl);

  //   // 수평 방향 스와이프만 감지하도록 설정
  //   hammer.get("swipe").set({
  //     direction: Hammer.DIRECTION_HORIZONTAL,
  //     threshold: 50,
  //   });

  //   // 스와이프 이벤트 핸들러
  //   hammer.on("swipeleft swiperight", (e: any) => {
  //     const calendarApi: CalendarApi | undefined = calendarRef.current?.getApi();
  //     if (!calendarApi) return;

  //     if (e.type === "swiperight") {
  //       calendarApi.prev(); // 이전 달
  //     } else if (e.type === "swipeleft") {
  //       calendarApi.next(); // 다음 달
  //     }
  //   });

  //   // 클린업 함수
  //   return () => {
  //     hammer.destroy();
  //   };
  // }, []);

  // const handleDatesSet = (selectInfo: any) => {
  //   const { start } = selectInfo;

  //   const year = dayjs(start).year();
  //   const month = dayjs(start).month() + 1;

  //   setCalendarYearMonth((prev: any) => ({ ...prev, year: year, month: month }));

  //   // 날짜 선택 처리
  // };

  const { calendarDateStore } = useCombinedStore() as { calendarDateStore: CalendarDate };

  const handleDateSelect = (arg: any) => {
    calendarDateStore.setCurrentCalendarDate(arg.start);
  };

  const datePickerStyles = useMemo(
    () => ({
      month: { width: "100%" },
      calendarHeader: { maxWidth: "unset" },
      day: { width: "100%", height: 55 },
    }),
    []
  );
  const memoizedDetails = useMemo(() => {
    return meals || [];
  }, [meals]);
  const [dateValue, setDateValue] = useState<any>(dayjs().toDate());

  const RenderDate = useCallback(
    (date: Date) => {
      const dayFormat = dayjs(date).format("YYYY-MM-DD");
      const day = date.getDate();

      const result = memoizedDetails.find((item: any) => {
        if (item.holiday) {
          return item.holiday.start === dayFormat;
        }
        return item.start === dayFormat;
      });

      if (result?.holiday) {
        return (
          <Indicator
            offset={-10}
            key={day}
            position="bottom-center"
            inline
            label={
              <Text fz={8} c="red">
                {result.holiday.name}
              </Text>
            }
            size={20}
            color="transparent"
          >
            <div>{day}</div>
          </Indicator>
        );
      }

      return (
        <Indicator offset={-10} key={day} position="bottom-center" inline label={calendarIcon(result?.lunch.attendance)} size={20} color="transparent">
          <div>{day}</div>
        </Indicator>
      );
    },
    [memoizedDetails]
  );
  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"} ref={containerRef}>
      <Title order={5} mb={"md"}>
        식대 입력하기
      </Title>
      <DatePicker
        styles={datePickerStyles}
        locale="ko"
        date={dateValue}
        onChange={setDateValue}
        highlightToday
        hideOutsideDates
        onPreviousMonth={(date: Date) => setDateValue(date)}
        onNextMonth={(date: Date) => setDateValue(date)}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"
        firstDayOfWeek={0}
        renderDay={RenderDate}
      />
      <Divider my={"lg"} />
      <Detail date={dateValue} meals={meals} />
    </Paper>
  );
}
