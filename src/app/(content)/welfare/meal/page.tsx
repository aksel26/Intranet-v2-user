"use client";

import Calendar from "@/components/content/meal/Calendar";

import { useCombinedStore } from "@/lib/store/CombinedStore";

import * as api from "@/app/api/get/getApi";
import LunchGroup from "@/components/content/meal/LunchGroup";
import { TopTitle } from "@/components/content/welfare/TopTitle";
import useTopTitle from "@/hooks/useTopTitle";
import { mealStateStore } from "@/lib/store/mealStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
const Main = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["meals", calendarYearMonth], queryFn: () => api.getMeals(calendarYearMonth) });
  console.log("🚀 ~ Main ~ data:", data);

  const { mealStore } = useCombinedStore() as { mealStore: mealStateStore };
  const pathName = usePathname();
  const { typeTitle, statsInfo } = useTopTitle({ pathName });
  useEffect(() => {
    if (data) {
      const result = data.data.data;
      mealStore.setMealInfo(result);
    }
  }, [data]);

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack>
            <TopTitle />
            <ChartSummary statsInfo={statsInfo} />
            <LunchGroup />

            {/* <CalendarList /> */}
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }}>
          <Calendar setCalendarYearMonth={setCalendarYearMonth} />
        </GridCol>
      </Grid>
    </Container>
  );
};

export default Main;
