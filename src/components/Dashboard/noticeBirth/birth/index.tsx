import * as api from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";
const Birth = ({ month, activeTab }: { activeTab: string | null; month: string }) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["notices", { month: month }], queryFn: () => api.getBirth({ month }) });
  const birth = data?.data.data;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (isError) {
      return <ErrorView>생일자 인원을 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    }
    if (birth.length === 0) {
      return <EmptyView />;
    }

    return (
      <Stack gap={"md"} pos={"relative"}>
        {birth.map((item: any) => (
          <Group key={item.userIdx} ml={"xs"}>
            <Text fz={"sm"}>🎉</Text>
            <Text fz={"sm"}>{item.userName}</Text>
            <Text fz={"sm"}>{item.gradeName}</Text>
            <Text c="dimmed" fz={"sm"}>
              {dayjs(item.userBirth).format("MM월 DD일")}
            </Text>
          </Group>
        ))}
        {activeTab === "birth" && (
          <Fireworks autorun={{ speed: 0.2 }} style={{ position: "absolute", width: "100%", height: 140, right: 0, top: -80, zIndex: 0 }} />
        )}
      </Stack>
    );
  };

  return <>{renderContent()}</>;
};

export default Birth;
