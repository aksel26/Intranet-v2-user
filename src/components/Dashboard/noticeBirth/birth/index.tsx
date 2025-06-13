import * as api from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

interface BirthProps {
  month: string;
}

const Birth = ({ month }: BirthProps) => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["birth", { month: month }],
    queryFn: () => api.getBirth({ month }).then((res) => res.data),
  });
  const birth = data?.data;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }
    if (isError) {
      return (
        <ErrorView>생일자 인원을 불러오는 중 문제가 발생하였습니다.</ErrorView>
      );
    }
    if (birth?.length === 0) {
      return <EmptyView />;
    }
    return (
      <Stack gap={"xs"}>
        {birth.map((item: any) => (
          <Group key={item.userIdx} ml={"xs"} style={{ zIndex: 1 }}>
            <Text fz={"xs"}>🎉</Text>
            <Text fz={"xs"}>{item.userName}</Text>
            <Text fz={"xs"}>{item.gradeName}</Text>
            <Text c="dimmed" fz={"xs"}>
              {dayjs(item.userBirth).format("MM월 DD일")}
            </Text>
          </Group>
        ))}
      </Stack>
    );
  };

  return <>{renderContent()}</>;
};

Birth.displayName = "Birth";

export default Birth;
