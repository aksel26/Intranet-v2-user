"use client";

import { ToptitleActivity } from "@/components/content/activity/ToptitleActivity";
import { UsedListActivity } from "@/components/content/activity/UsedListActivity";
import { Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import * as api from "../../api/get/getApi";
const ActivityMain = () => {
  const nowMonthYear = dayjs();
  const [calendarYearMonth, setCalendarYearMonth] = useState({
    year: nowMonthYear.year(),
    month: nowMonthYear.month() + 1,
  });

  const { data, isLoading, isError } = useQuery({ queryKey: ["activity", calendarYearMonth], queryFn: () => api.getActivities(calendarYearMonth) });

  return (
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <ToptitleActivity />
        <UsedListActivity />
      </Flex>
    </Container>
  );
};

export default ActivityMain;
