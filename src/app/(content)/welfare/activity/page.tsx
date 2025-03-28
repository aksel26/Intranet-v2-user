"use client";

import * as api from "@/app/api/get/getApi";
import ActivityInputForm from "@/components/content/activity/ActivityInputForm";
import { ToptitleActivity } from "@/components/content/activity/ToptitleActivity";
import { UsedListActivity } from "@/components/content/activity/UsedListActivity";
import { yearsList } from "@/utils/dateFomat";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { Container, Grid, GridCol, Group, Paper, Select, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
const ActivityMain = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["activity", params], queryFn: () => api.getActivities(params) });
  const [halfYearValue, setHalfYearValue] = useState<string>(params.halfYear);
  const [yearValue, setYearValue] = useState<string | null>(dayjs().year().toString());

  const activities = data && groupByDate(data?.data.data.activities);
  const activitiesStats = data?.data.data.activityStats;

  const [isActive, setIsActive] = useState({
    yearSelect: false,
    halfYearSelect: false,
  });
  const selectHalfYear = (e: any) => {
    setParams((params) => ({ ...params, halfYear: e }));
    setHalfYearValue(e);
    setIsActive((prev) => ({ ...prev, halfYearSelect: false }));
  };
  const selectYear = (e: any) => {
    setParams((params) => ({ ...params, year: e }));
    setYearValue(e);
    setIsActive((prev) => ({ ...prev, yearSelect: false }));
  };

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <ToptitleActivity stats={activitiesStats} isLoading={isLoading} />
          <Group mt={"lg"} mb={"xs"}>
            <Select
              w={130}
              comboboxProps={{
                withinPortal: false,
                transitionProps: { transition: "pop", duration: 200 },
              }}
              onChange={selectYear}
              value={yearValue}
              data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
              styles={{
                root: { width: "max-content" },
                input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
              }}
              dropdownOpened={isActive.yearSelect}
              onBlur={() => setIsActive((prev) => ({ ...prev, yearSelect: false }))}
              onClick={() => {
                setIsActive((prev) => ({ ...prev, yearSelect: true }));
              }}
            />
            <Select
              w={100}
              comboboxProps={{
                withinPortal: false,
                transitionProps: { transition: "pop", duration: 200 },
              }}
              onChange={selectHalfYear}
              value={halfYearValue}
              data={[
                { label: "상반기", value: "H1" },
                { label: "하반기", value: "H2" },
              ]}
              styles={{
                root: { width: "max-content" },
                input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
              }}
              dropdownOpened={isActive.halfYearSelect}
              onBlur={() => setIsActive((prev) => ({ ...prev, halfYearSelect: false }))}
              onClick={() => {
                setIsActive((prev) => ({ ...prev, halfYearSelect: true }));
              }}
            />
          </Group>
          <UsedListActivity activities={activities} isLoading={isLoading} />
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

      {/* <Flex direction={"column"} rowGap={"sm"}>
        <ToptitleActivity />
        
      </Flex> */}
    </Container>
  );
};

export default ActivityMain;
