"use client";

import Calendar from "@/components/content/meal/Calendar";
import { MealFetchWrapper } from "@/components/content/meal/MealFetchWrapper";
import PageContainer from "@/components/Global/container";
import { Grid, GridCol } from "@mantine/core";
import { Suspense } from "react";
import Loading from "../loading";

const Main = () => {
  return (
    <PageContainer>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Suspense fallback={<Loading />}>
            <MealFetchWrapper />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }}>
          <Calendar />
        </GridCol>
      </Grid>
    </PageContainer>
  );
};

export default Main;
