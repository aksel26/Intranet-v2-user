"use client";

import { TopTitle } from "@/components/content/welfare/TopTitle";
import { UsedList } from "@/components/content/welfare/UsedList";
import { useCombinedStore } from "@/lib/store/CombinedStore";

import { welfareStateStore } from "@/lib/store/welfareStore";
import { Container, Flex } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import * as api from "../../api/get/getApi";
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
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"sm"}>
        <TopTitle />
        <UsedList setCalendarYearMonth={setCalendarYearMonth} />
      </Flex>
    </Container>
  );
};

export default WelfareMain;
