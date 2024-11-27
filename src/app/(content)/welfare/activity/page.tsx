"use client";

import { ToptitleActivity } from "@/components/content/activity/ToptitleActivity";
import { UsedListActivity } from "@/components/content/activity/UsedListActivity";
import { Affix, Button, Container, Flex, Grid, GridCol, Paper, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "@/app/api/get/getApi";
import { activityStore } from "@/lib/store/activityStore";
import ActivityInputForm from "@/components/content/activity/ActivityInputForm";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { useDisclosure } from "@mantine/hooks";
const ActivityMain = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["activity", calendarYearMonth], queryFn: () => api.getActivities(calendarYearMonth) });
  console.log("🚀 ~ ActivityMain ~ data:", data);

  // const { welfareStore } = useCombinedStore() as { welfareStore: welfareStateStore };

  const { setActivityInfo } = activityStore();

  useEffect(() => {
    if (data) {
      const result = data?.data.data;
      setActivityInfo(result);
    }
  }, [data]);

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack>
            <ToptitleActivity />
            <UsedListActivity setCalendarYearMonth={setCalendarYearMonth} />
          </Stack>
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
