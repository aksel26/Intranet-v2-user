import { mealService } from "@/api/services/meal/meal.services";
import { useApiQuery } from "@/api/useApi";
import { useCalendarStore, type mealStateStore } from "@/store/benefit/meal/mealStore";
import { useCombinedStore } from "@/store/combinedStore";
import { Grid, GridCol, Stack } from "@mantine/core";
import { useEffect } from "react";
import Visited from "../visited";
import LunchGroup from "../lunchGroup";
import { TopTitleMeal } from "../title";
import LunchStats from "../stats";

export const MealFetchWrapper = () => {
  const { year, month } = useCalendarStore();

  const { data, isLoading, isError } = useApiQuery(["meals", { year: year, month: month }], () => mealService.getMeals({ year: year, month: month }));
  const mealStats = data?.data.data.mealStats;

  const { mealStore } = useCombinedStore() as { mealStore: mealStateStore };

  useEffect(() => {
    mealStore.setMealInfo(data?.data.data.meals);
  }, [data]);

  return (
    <Stack>
      <TopTitleMeal stats={mealStats} />
      <Grid>
        <GridCol span={{ base: 12, sm: 12, lg: 6 }}>
          <LunchStats mealStats={mealStats} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, lg: 6 }}>
          <Visited />
        </GridCol>
      </Grid>
      <LunchGroup />
    </Stack>
  );
};
