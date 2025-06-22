// import * as api from "@/app/api/get/getApi";
// import EmptyView from "@/components/Global/view/EmptyView";
// import { ErrorView } from "@/components/Global/view/ErrorView";
// import LoadingView from "@/components/Global/view/LoadingView";
import { userService } from "@/api/services/user/user.services";
import { useApiQuery } from "@/api/useApi";
import { Group, ScrollArea, Stack, Text } from "@mantine/core";

import dayjs from "dayjs";

interface BirthProps {
  month: string;
}

const Birth = ({ month }: BirthProps) => {
  const { data, isLoading, isError } = useApiQuery(
    ["birth", { month: month }],
    () =>
      userService.getBirth({
        month: (dayjs(month).month() + 1).toString(),
      })
  );

  const birth = data?.data.data;

  const renderContent = () => {
    if (isLoading) {
      return "로딩증";
    }
    if (isError) {
      return <>생일자 인원을 불러오는 중 문제가 발생하였습니다.</>;
    }
    // if (birth?.length === 0) {
    //   return <EmptyView />;
    // }
    return (
      <ScrollArea h={120}>
        <Stack gap={"xs"} pt={"xs"}>
          {birth.map((item: any) => (
            <Group key={item.userIdx} ml={"xs"} style={{ zIndex: 1 }}>
              <Text fz={"sm"}>🎉</Text>
              <Text miw={35} fz={"sm"}>
                {item.userName}
              </Text>
              <Text miw={40} fz={"sm"}>
                {item.gradeName}
              </Text>
              <Text c="dimmed" fz={"sm"}>
                {dayjs(item.userBirth).format("MM월 DD일")}
              </Text>
            </Group>
          ))}
        </Stack>
      </ScrollArea>
    );
  };

  return <>{renderContent()}</>;
};

Birth.displayName = "Birth";

export default Birth;
