"use client";

import Calendar from "@/components/content/meal/Calendar";

import { Detail } from "@/components/detail/Detail";
import { useGetMeals } from "@/hooks/useMeals";
import { useCombinedStore } from "@/lib/store/CombinedStore";

import { mealStateStore } from "@/lib/store/mealStore";
import { Container, Flex, Grid, GridCol, Paper, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "@/app/api/get/getApi";
import { TopTitle } from "@/components/content/welfare/TopTitle";
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
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <TopTitle />
          <GridCol span={{ base: 12, md: 12 }}>
            <Paper bg={"white"} radius={"lg"}>
              <Text>날짜리스트</Text>
            </Paper>
          </GridCol>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Calendar setCalendarYearMonth={setCalendarYearMonth} />
          <Detail />
        </GridCol>
      </Grid>
    </Container>
  );
};

export default Main;
