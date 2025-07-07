import { Box, Group, Select } from "@mantine/core";
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

      <Group mt={"lg"} justify="space-between" align="center">
        <Group align="center" gap="xs">
          <YearSelect setParams={setParams} w={120} />
          <DurationSelect setParams={setParams} w={120} />
        </Group>
        <Select
          data={["팀", "본부"]}
          comboboxProps={{
            withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            transitionProps: { transition: "pop", duration: 200 },
            size: "sm",
          }}
          w={120}
          size="md"
          variant="unstyled"
          clearable
          placeholder="활동비 구분"
        />
      </Group>

      <UsedListActivity activities={activities} />
    </>
  );
};
