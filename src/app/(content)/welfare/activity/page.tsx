"use client";

import * as api from "@/app/api/get/getApi";
import ActivityInputForm from "@/components/content/activity/ActivityInputForm";
import { ToptitleActivity } from "@/components/content/activity/ToptitleActivity";
import { UsedListActivity } from "@/components/content/activity/UsedListActivity";
import DurationSelect from "@/components/Global/dateSelect/DurationSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { Container, Grid, GridCol, Group, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

const ActivityMain = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["activity", params], queryFn: () => api.getActivities(params) });

  const activities = data && groupByDate(data?.data.data.activities);
  const activitiesStats = data?.data.data.activityStats;

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <ToptitleActivity stats={activitiesStats} isLoading={isLoading} isError={isError} />

          <Group mt={"lg"}>
            <YearSelect setParams={setParams} w={120} />
            <DurationSelect setParams={setParams} w={120} />
          </Group>
          <UsedListActivity activities={activities} isLoading={isLoading} isError={isError} />
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
    </Container>
  );
};

export default ActivityMain;
