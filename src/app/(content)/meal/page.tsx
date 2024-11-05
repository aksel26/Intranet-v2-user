"use client";

import Calendar from "@/components/content/meal/Calendar";
import { TopTitle } from "@/components/content/welfare/TopTitle";
import { Detail } from "@/components/detail/Detail";
import { useGetMeals } from "@/hooks/useMeals";
import { useCombinedStore } from "@/lib/store/CombinedStore";

import { mealStateStore } from "@/lib/store/mealStore";
import { Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "../../api/get/getApi";
const Main = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["meals", calendarYearMonth], queryFn: () => api.getMeals(calendarYearMonth) });
  console.log("🚀 ~ Main ~ data:", data);

  const { mealStore } = useCombinedStore() as { mealStore: mealStateStore };

  useEffect(() => {
    if (data) {
      const result = data.data.data;
      mealStore.setMealInfo(result);
    }
  }, [data]);

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
