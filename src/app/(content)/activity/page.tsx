"use client";

import { ToptitleActivity } from "@/components/content/activity/ToptitleActivity";
import { UsedListActivity } from "@/components/content/activity/UsedListActivity";
import { Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "../../api/get/getApi";
import { activityStore } from "@/lib/store/activityStore";
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
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <ToptitleActivity />
        <UsedListActivity setCalendarYearMonth={setCalendarYearMonth} />
      </Flex>
    </Container>
  );
};

export default ActivityMain;
