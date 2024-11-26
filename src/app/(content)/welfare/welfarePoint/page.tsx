"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { useCombinedStore } from "@/lib/store/CombinedStore";

import { welfareStateStore } from "@/lib/store/welfareStore";
import { Container, Flex, Grid, GridCol, Paper, Stack, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "../../../api/get/getApi";
import WelfareInputForm from "@/components/content/welfare/WelfareInputForm";
const WelfareMain = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["welfares", calendarYearMonth], queryFn: () => api.getWelfares(calendarYearMonth) });

  const { welfareStore } = useCombinedStore() as { welfareStore: welfareStateStore };

  useEffect(() => {
    if (data) {
      const result = data?.data.data;
      welfareStore.setwelfareInfo(result);
    }
  }, [data]);

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Stack>
            <TopTitle />
            <UsedList setCalendarYearMonth={setCalendarYearMonth} />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 4 }} visibleFrom="md">
          <Paper bg={"white"} py="lg" px={"lg"} radius={"lg"}>
            <Title order={5} mb={"md"}>
              복지포인트 입력
            </Title>

            <WelfareInputForm />
          </Paper>
        </GridCol>
      </Grid>
    </Container>
  );
};

export default WelfareMain;
