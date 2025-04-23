import * as api from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { Group, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { forwardRef } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/realistic";

interface BirthProps {
  month: string;
  activeTab: string | null;
}

const Birth = forwardRef<HTMLDivElement, BirthProps>(({ month, activeTab }, ref) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["notices", { month: month }], queryFn: () => api.getBirth({ month }) });
  const birth = data?.data.data;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (isError) {
      return <ErrorView>생일자 인원을 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    }
    if (birth?.length === 0) {
      return <EmptyView />;
    }
    const cardHeight = (ref as React.RefObject<HTMLDivElement>)?.current?.offsetHeight || 0;
    return (
      <Stack gap={"md"} pos={"relative"} h={"100%"}>
        {birth.map((item: any) => (
          <Group key={item.userIdx} ml={"xs"}>
            <Text fz={"xs"}>🎉</Text>
            <Text fz={"xs"}>{item.userName}</Text>
            <Text fz={"xs"}>{item.gradeName}</Text>
            <Text c="dimmed" fz={"xs"}>
              {dayjs(item.userBirth).format("MM월 DD일")}
            </Text>
          </Group>
        ))}
        {activeTab === "birth" && (
          <Fireworks autorun={{ speed: 0.2 }} style={{ position: "absolute", width: "100%", height: cardHeight, right: 0, top: -80, zIndex: 0 }} />
        )}
      </Stack>
    );
  };

  return <>{renderContent()}</>;
});

Birth.displayName = "Birth";

export default Birth;
