"use client";
import * as api from "@/app/api/get/getApi";
import { Detail } from "@/components/detail/Detail";
import { mealStore, useCalendarStore } from "@/lib/store/mealStore";
import { TMyVacations } from "@/types/apiTypes";
import { calendarIcon } from "@/utils/meal/calendarIcon";
import { Divider, Indicator, Paper, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useCallback, useMemo, useRef, useState } from "react";
import "../../../styles/calendar.css";

export default function Calendar() {
  const mealList = mealStore((state) => state.mealInfo);
  const containerRef = useRef<HTMLDivElement>(null);

  const { setMonth } = useCalendarStore();

  const [params, setParams] = useState<TMyVacations>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
    confirmYN: "Y",
  });
  const {
    data: vacations,
    isLoading: isLoading_vacations,
    isError: isError_vacations,
  } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => api.getMyVacations(params) });

  const vacationData = vacations?.data.data;

  const datePickerStyles = useMemo(
    () => ({
      month: { width: "100%" },
      calendarHeader: { maxWidth: "unset" },
      day: { width: "100%", height: 55 },
    }),
    []
  );

  const [dateValue, setDateValue] = useState<any>(dayjs().toDate());

  const handleMonth = (date: Date) => {
    setDateValue(date);
    setMonth((dayjs(date).month() + 1).toString());
  };

  const renderDate = useCallback(
    (date: Date) => {
      const dayFormat = dayjs(date).format("YYYY-MM-DD");
      const day = date.getDate();

      const vacationResult = vacationData?.find((item: any) => {
        if (item.holiday) {
          return item.commuteDate === dayFormat;
        }
        return item.commuteDate === dayFormat;
      });

      const mealsResult = mealList?.find((item: any) => {
        if (item) {
          return item.start === dayFormat;
        }
        return item.start === dayFormat;
      });
      if (mealsResult) {
        return (
          <Indicator offset={-10} key={day} position="bottom-center" inline label={"🍙"} size={20} color="transparent" zIndex={100}>
            <div>{day}</div>
          </Indicator>
        );
      }
      if (vacationResult) {
        return (
          <Indicator
            offset={-10}
            key={day}
            position="bottom-center"
            inline
            zIndex={100}
            label={
              <Text fz={8} c="red">
                {calendarIcon(vacationResult.leaveType)}
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
        // <Indicator offset={-10} key={day} position="bottom-center" inline label={calendarIcon(result?.lunch.attendance)} size={20} color="transparent">
        <div>{day}</div>
        // </Indicator>
      );
    },
    [vacationData, mealList]
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
        onPreviousMonth={(date: Date) => handleMonth(date)}
        onNextMonth={(date: Date) => handleMonth(date)}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"
        firstDayOfWeek={0}
        renderDay={renderDate}
      />
      <Divider my={"lg"} />
      <Detail date={dateValue} vacationData={vacationData} />
    </Paper>
  );
}
