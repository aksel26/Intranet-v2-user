"use client";

import Calendar from "@/components/content/meal/Calendar";

import { useCombinedStore } from "@/lib/store/CombinedStore";

import * as api from "@/app/api/get/getApi";
import LunchGroup from "@/components/content/meal/LunchGroup";
import { TopTitleMeal } from "@/components/content/meal/TopTitleMeal";
import { mealStateStore, useCalendarStore } from "@/lib/store/mealStore";
import { Container, Grid, GridCol, Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Main = () => {
  const { year, month } = useCalendarStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["meals", { year: year, month: month }],
    queryFn: () => api.getMeals({ year: year, month: month }),
  });
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
            <TopTitleMeal stats={mealStats} isLoading={isLoading} isError={isError} />
            <LunchGroup />
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
