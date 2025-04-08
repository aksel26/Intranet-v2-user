"use client";

import Calendar from "@/components/content/meal/Calendar";

import { useCombinedStore } from "@/lib/store/CombinedStore";

import * as api from "@/app/api/get/getApi";
import LunchGroup from "@/components/content/meal/LunchGroup";
// import { TopTitleMeal } from "@/components/content/welfare/TopTitleWelfare";
import useTopTitle from "@/hooks/useTopTitle";
import { mealStateStore, mealStore } from "@/lib/store/mealStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TopTitleMeal } from "@/components/content/meal/TopTitleMeal";

const Main = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["meals", calendarYearMonth], queryFn: () => api.getMeals(calendarYearMonth) });
  const meals = data?.data.data.meals;
  const mealStats = data?.data.data.mealStats;

  const { mealStore } = useCombinedStore() as { mealStore: mealStateStore };

  useEffect(() => {
    mealStore.setMealInfo(data?.data.data.meals);
  }, [data]);

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack>
            <TopTitleMeal stats={mealStats} isLoading={isLoading} />
            {/* <ChartSummary statsInfo={statsInfo} /> */}
            <LunchGroup />

            {/* <CalendarList /> */}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }}>
          <Calendar />
        </GridCol>
      </Grid>
    </Container>
  );
};

export default Main;
