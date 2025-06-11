"use client";

import { ActivityFetchWrapper } from "@/components/content/activity/ActivityFetchWrapper";
import ActivityInputForm from "@/components/content/activity/ActivityInputForm";
import PageContainer from "@/components/Global/container";
import { Grid, GridCol, Paper, Title } from "@mantine/core";
import { Suspense } from "react";
import Loading from "../loading";

const ActivityMain = () => {
  return (
    <PageContainer>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Suspense fallback={<Loading />}>
            <ActivityFetchWrapper />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }} visibleFrom="md">
          <Paper bg={"white"} py="lg" px={"lg"} radius={"lg"}>
            <Title order={5} mb={"md"}>
              활동비 입력
            </Title>

            <ActivityInputForm />
          </Paper>
        </GridCol>
      </Grid>
    </PageContainer>
  );
};

export default ActivityMain;
