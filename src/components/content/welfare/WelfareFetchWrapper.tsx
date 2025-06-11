import { getWelfares } from "@/app/api/get/getApi";
import DurationSelect from "@/components/Global/dateSelect/DurationSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { Group } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { TopTitleWelfare } from "./TopTitleWelfare";
import { UsedListWelfare } from "./UsedListWelfare";

export const WelfareFetchWrapper = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });
  const { data } = useSuspenseQuery({
    queryKey: ["welfares", params],
    queryFn: () => getWelfares(params).then((res) => res.data),
  });

  const welfares = data && groupByDate(data?.data.welfares);
  const welfareStats = data?.data.welfareStats;

  return (
    <>
      <TopTitleWelfare stats={welfareStats} />

      <Group mt={"lg"}>
        <YearSelect setParams={setParams} w={120} />
        <DurationSelect setParams={setParams} w={120} />
      </Group>

      <UsedListWelfare welfares={welfares} />
    </>
  );
};
