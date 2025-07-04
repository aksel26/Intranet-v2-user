//import { getMe } from "@/app/api/get/getApi";
import { userService } from "@/api/services/user/user.services";
import { useApiQuery } from "@/api/useApi";
import { myInfoStore } from "@/store/myInfoStore";
import { getDDayCount } from "@/utils/dday/ddayCount";
// import { myInfoStore } from "@/lib/store/myInfoStore";
// import { getDDayCount } from "@/utils/date/dDayCount";
import { Box, Card, Flex, Group, Skeleton, Text } from "@mantine/core";
// import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserInfoCard = () => {
  const { setMyInfo, myInfo } = myInfoStore();

  const [queryKey, setQueryKey] = useState<string>();

  const { data: me, isLoading } = useApiQuery(["me", { userIdx: queryKey }], userService.getMe);

  useEffect(() => {
    setMyInfo(me?.data.data);
    if (me?.data.data) setQueryKey(me?.data.data.userIdx);
  }, [me]);

  return (
    <Skeleton visible={isLoading}>
      <Card padding="md" radius="md" bg={"beige.1"}>
        <Flex direction={"column"} w={"100%"} columnGap={"xl"} style={{ position: "relative", borderRadius: 7 }}>
          <Flex direction={"column"} rowGap={"md"} w={"100%"}>
            <Box>
              <Text fz={"lg"} fw={500} c={"beige.9"}>
                {myInfo?.userName}
                <Text fz={"sm"} c={"beige.9"} component="span" ml={5}>
                  {myInfo?.gradeName}
                </Text>
              </Text>
              <Group gap={"xs"} mt={3}>
                <Text fz={"sm"} c={"beige.9"} component="span">
                  {myInfo?.hqName}
                </Text>
                <Text fz={"sm"} c={"beige.9"} component="span">
                  {myInfo?.teamName || ""}
                </Text>
              </Group>
            </Box>

            <Group justify="space-between" align="end">
              <Text c={"primary.9"} size={"xs"}>
                {myInfo?.userEmail}
              </Text>
              <Text c={"primary.9"} size={"xs"}>
                {getDDayCount(myInfo?.joinDate)}
              </Text>
            </Group>
          </Flex>
        </Flex>
      </Card>
    </Skeleton>
  );
};

export default UserInfoCard;
