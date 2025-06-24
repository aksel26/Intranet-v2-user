import { Group } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { activityService } from "@/api/services/activity/activity.services";
import { useApiQuery } from "@/api/useApi";
import { groupByDate } from "@/utils/points/groupByDate";
import DurationSelect from "../common/select/halfYear";
import YearSelect from "../common/select/year";
import { ToptitleActivity } from "./title";
import { UsedListActivity } from "./list";

export const ActivityFetchWrapper = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });

  const { data, isLoading, isError } = useApiQuery(["activity", params], () => activityService.getUsedActivity(params));

  const activities = data && groupByDate(data?.data.data.activities);
  const activitiesStats = data?.data.data.activityStats;

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
