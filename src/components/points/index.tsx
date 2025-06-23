import { pointsService } from "@/api/services/points/points.services";
import { useApiQuery } from "@/api/useApi";
import { Group, Stack } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";
import { groupByDate } from "@/utils/points/groupByDate";
import ScrollToTop from "../global/scrollTop";
import DurationSelect from "../global/select/halfYear";
import YearSelect from "../global/select/year";
import { UsedListWelfare } from "./list";
import { TopTitleWelfare } from "./title";

export const WelfareFetchWrapper = () => {
  const [params, setParams] = useState({
    year: dayjs().year().toString(),
    halfYear: Number(dayjs().month() + 1) > 6 ? "H2" : "H1",
  });

  const { data, isLoading } = useApiQuery(["welfares", params], () => pointsService.getUsedPoint(params));

  const welfares = data && groupByDate(data?.data.data.welfares);
  const welfareStats = data?.data.data.welfareStats;

  return (
    <Stack>
      <TopTitleWelfare stats={welfareStats} />

      <Group mt={"lg"}>
        <YearSelect setParams={setParams} w={120} />
        <DurationSelect setParams={setParams} w={120} />
      </Group>

      <UsedListWelfare welfares={welfares} />
      <ScrollToTop />
    </Stack>
  );
};
