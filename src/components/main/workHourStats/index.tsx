// import * as api from "@/app/api/get/getApi";
// import { ErrorView } from "@/components/common/view/ErrorView";
// import LoadingView from "@/components/common/view/LoadingView";
// import { mainDateStore } from "@/lib/store/mainDateStore";
import { statsService } from "@/api/services/stats/stats.services";
import { useApiQuery } from "@/api/useApi";
import { ErrorView } from "@/components/common/error";
import LoadingView from "@/components/loading";
import { mainDateStore } from "@/store/mainDateStore";
import { ActionIcon, Group, Paper, Title } from "@mantine/core";
// import { IconDots } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Ellipsis } from "lucide-react";

import WorkStatsChart from "./chart";
import { useNavigate } from "react-router-dom";
// import WorkStats from "./chart";
// import IconDots from "/public/icons/dots.svg";
const WorkHourStats = () => {
  const { dateValue } = mainDateStore();
  const param = {
    year: dayjs(dateValue).year().toString(),
    month: (dayjs(dateValue).month() + 1).toString(),
  };

  const { data, isLoading, isError } = useApiQuery(["workHours", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }], () => statsService.getWorkHourStats(param));

  const navigate = useNavigate();
  const goWorkDetails = () => navigate("/attendance/work");
  const workStats = data?.data.data.weeklyWorkHours || [];
  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>업무시간 정보를 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    return <WorkStatsChart workStats={workStats} />;
  };

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Group justify="space-between" align="center" mb={"xs"}>
        <Title order={5}>이번달 나의 업무 시간</Title>

        <ActionIcon onClick={goWorkDetails} variant="default">
          <Ellipsis size={18} />
        </ActionIcon>
      </Group>
      {renderContent()}
    </Paper>
  );
};

export default WorkHourStats;
