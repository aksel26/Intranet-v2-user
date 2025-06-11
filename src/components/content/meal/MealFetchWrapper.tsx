import { getMeals } from "@/app/api/get/getApi";
import { useCombinedStore } from "@/lib/store/CombinedStore";
import { mealStateStore, useCalendarStore } from "@/lib/store/mealStore";
import { Grid, GridCol, Stack } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import VisitedFrequency from "./frequencyVisited";
import LunchGroup from "./LunchGroup";
import LunchStats from "./stats";
import { TopTitleMeal } from "./TopTitleMeal";

export const MealFetchWrapper = () => {
  const { year, month } = useCalendarStore();
  const { data } = useSuspenseQuery({
    queryKey: ["meals", { year: year, month: month }],
    queryFn: () => getMeals({ year: year, month: month }).then((res) => res.data),
  });
  const mealStats = data?.data.mealStats;

  const { mealStore } = useCombinedStore() as { mealStore: mealStateStore };

  useEffect(() => {
    mealStore.setMealInfo(data?.data.meals);
  }, [data]);

  return (
    <Stack>
      <TopTitleMeal stats={mealStats} />
      <Grid>
        <GridCol span={{ base: 12, sm: 12, lg: 6 }}>
          <LunchStats mealStats={mealStats} />
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, lg: 6 }}>
          <VisitedFrequency />
        </GridCol>
      </Grid>
      <LunchGroup />
    </Stack>
  );
};
