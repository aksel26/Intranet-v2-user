import { getMe } from "@/app/api/get/getApi";
import { ErrorViewSmall } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { Box, Flex, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useCallback, useEffect } from "react";

const UserInfoCard = () => {
  const { setMyInfo } = myInfoStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
  });

  const myInfo = data?.data.data;

  useEffect(() => {
    setMyInfo(data?.data.data);
  }, [data]);

  const getDDayCount = useCallback((baseDate: string | null) => {
    const today = dayjs();
    const target = dayjs(baseDate);
    const diff = today.diff(target, "day") + 1;

    return diff >= 0 ? `ACG Day + ${diff}` : `-`;
  }, []);

  const renderContent = () => {
    if (isError)
      return (
        <ErrorViewSmall>
          유저 정보를 불러오는 중 문제가 발생했습니다.
        </ErrorViewSmall>
      );

    if (isLoading) return <LoadingView />;
    const { userName, gradeName, hqName, teamName, userEmail, joinDate } =
      myInfo;

    return (
      <Skeleton visible={isLoading}>
        <Stack w={"100%"} bg={"primary.0"} align={"center"} mih={100} p={"md"}>
          <Flex
            direction={"column"}
            w={"100%"}
            columnGap={"xl"}
            style={{ position: "relative", borderRadius: 7 }}
          >
            <Flex direction={"column"} rowGap={"md"} w={"100%"}>
              <Box>
                <Text fz={"lg"} fw={600} c={"primary.9"}>
                  {userName}
                  <Text fz={"sm"} c={"primary.9"} component="span" ml={5}>
                    {gradeName}
                  </Text>
                </Text>
                <Group gap={"xs"} mt={3}>
                  <Text fz={"sm"} c={"primary.9"} component="span">
                    {hqName}
                  </Text>
                  <Text fz={"sm"} c={"primary.9"} component="span">
                    {teamName || ""}
                  </Text>
                </Group>
              </Box>

              <Group justify="space-between" align="end">
                <Text c={"primary.9"} size={"xs"}>
                  {userEmail}
                </Text>
                <Text c={"primary.9"} size={"xs"}>
                  {getDDayCount(joinDate)}
                </Text>
              </Group>
            </Flex>
          </Flex>
        </Stack>
      </Skeleton>
    );
  };

  return <>{renderContent()}</>;
};

export default UserInfoCard;
