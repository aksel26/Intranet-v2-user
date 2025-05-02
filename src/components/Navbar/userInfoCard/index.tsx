import { getMe } from "@/app/api/get/getApi";
import { ErrorViewSmall } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { getDDayCount } from "@/utils/date/dDayCount";
import { Box, Card, Flex, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";

const UserInfoCard = () => {
  const { setMyInfo } = myInfoStore();

  const session = useSession();

  const [queryKey, setQueryKey] = useState<string>();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me", { userIdx: queryKey }],
    queryFn: () => getMe(),
  });

  const myInfo = data?.data.data;

  useEffect(() => {
    setMyInfo(data?.data.data);
    if (session.data) setQueryKey(session?.data.user.id);
  }, [data, session]);

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
        <Card padding="md" radius="md" bg={"primary.0"}>
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
        </Card>
      </Skeleton>
    );
  };

  return <>{renderContent()}</>;
};

export default UserInfoCard;
