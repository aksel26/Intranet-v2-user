import Calendar from "@/components/meal/calendar";
import { MealFetchWrapper } from "@/components/meal/wrapper";
import { Grid, GridCol } from "@mantine/core";

const Meal = () => {
  return (
    <Grid>
      <GridCol span={{ base: 12, md: 8 }}>
        <MealFetchWrapper />
      </GridCol>
      <GridCol span={{ base: 12, md: 4 }}>
        <Calendar />
      </GridCol>
    </Grid>
  );
};

export default Meal;
