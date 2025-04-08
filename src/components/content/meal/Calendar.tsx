"use client";

import { Detail } from "@/components/detail/Detail";
import { useCombinedStore } from "@/lib/store/CombinedStore";
import { CalendarDate } from "@/lib/store/calendarDateStore";
import { calendarIcon } from "@/utils/meal/calendarIcon";
import { Divider, Indicator, Paper, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import "../../../styles/calendar.css";

export default function Calendar({ meals }: any) {
  console.log("🚀 ~ Calendar ~ meals:", meals);
  // const { meals } = mealStore((state) => state.mealInfo);
  const containerRef = useRef<HTMLDivElement>(null);

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
