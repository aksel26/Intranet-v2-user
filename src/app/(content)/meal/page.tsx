"use client";

import Calendar from "@/components/content/meal/Calendar";
import { TopTitle } from "@/components/content/welfare/TopTitle";
import { Detail } from "@/components/detail/Detail";
import { useGetMeals } from "@/hooks/useMeals";
import { useCombinedStore } from "@/lib/store/CombinedSotre";
import { mealStateStore } from "@/lib/store/mealStore";
import { Container, Flex } from "@mantine/core";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const Main = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data: mealInfo, isLoading, error } = useGetMeals(calendarYearMonth);

  const { store1 } = useCombinedStore() as { store1: mealStateStore };

  useEffect(() => {
    if (mealInfo) {
      const result = mealInfo.data.data;
      store1.setMealInfo(result);
    }
  }, [mealInfo]);

  return (
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        <Calendar setCalendarYearMonth={setCalendarYearMonth} />
        <Detail />
      </Flex>
    </Container>
  );
};

export default Main;
