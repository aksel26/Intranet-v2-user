"use client";

import { TopTitleWelfare } from "@/components/content/welfare/TopTitleWelfare";
import { UsedListWelfare } from "@/components/content/welfare/UsedListWelfare";
import WelfareInputForm from "@/components/content/welfare/WelfareInputForm";
import DurationSelect from "@/components/Global/dateSelect/DurationSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { Container, Grid, GridCol, Group, Paper, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import * as api from "../../../api/get/getApi";
const WelfareMain = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["welfares", params], queryFn: () => api.getWelfares(params) });

  const welfares = data && groupByDate(data?.data.data.welfares);
  const welfareStats = data?.data.data.welfareStats;

  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <TopTitleWelfare stats={welfareStats} isLoading={isLoading} isError={isError} />

          <Group mt={"lg"}>
            <YearSelect setParams={setParams} w={120} />
            <DurationSelect setParams={setParams} w={120} />
          </Group>

          <UsedListWelfare welfares={welfares} isLoading={isLoading} isError={isError} />
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
