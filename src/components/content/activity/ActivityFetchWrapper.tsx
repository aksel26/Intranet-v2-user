import { getActivities } from "@/app/api/get/getApi";
import DurationSelect from "@/components/Global/dateSelect/DurationSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { Group } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { ToptitleActivity } from "./ToptitleActivity";
import { UsedListActivity } from "./UsedListActivity";

export const ActivityFetchWrapper = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });
  const { data } = useSuspenseQuery({
    queryKey: ["activity", params],
    queryFn: () => getActivities(params).then((res) => res.data),
  });

  const activities = data && groupByDate(data?.data.activities);
  const activitiesStats = data?.data.activityStats;

  return (
    <>
      <ToptitleActivity stats={activitiesStats} />

      <Group mt={"lg"}>
        <YearSelect setParams={setParams} w={120} />
        <DurationSelect setParams={setParams} w={120} />
      </Group>

      <UsedListActivity activities={activities} />
    </>
  );
};
