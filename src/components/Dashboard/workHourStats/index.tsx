import * as api from "@/app/api/get/getApi";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { ActionIcon, Group, Paper, Title } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import WorkStats from "./chart";
// import IconDots from "/public/icons/dots.svg";
const WorkHourStats = () => {
  const { dateValue } = mainDateStore();
  const param = { year: dayjs(dateValue).year().toString(), month: (dayjs(dateValue).month() + 1).toString() };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendanceSummary", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }],
    queryFn: () => api.getWorkHourStats(param),
  });

  const router = useRouter();
  const goWorkDetails = () => router.push("/attendance/work");
  const workStats = data?.data.data.weeklyWorkHours || [];
  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>업무시간 정보를 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    return <WorkStats workStats={workStats} />;
  };

  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Group justify="space-between" align="center" mb={"xs"}>
        <Title order={5}>이번달 나의 업무 시간</Title>

        <ActionIcon onClick={goWorkDetails} variant="default">
          <IconDots size={18} />
        </ActionIcon>
      </Group>
      {renderContent()}
    </Paper>
  );
};

export default WorkHourStats;
