import { ActionIcon, Box, Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";

// import { adjustGroupArrays } from "@/utils/meal/lunchGroup";
import { mealService } from "@/api/services/meal/meal.services";
import { useApiQuery } from "@/api/useApi";
import EmptyView from "@/components/common/empty";
import { ErrorView } from "@/components/common/error";
import LoadingView from "@/components/loading";
import { adjustGroupArrays } from "@/utils/meals/lunchGroup";
import { Clover, RotateCcw } from "lucide-react";
import LotteryComponent from "../lottery";

const GroupDisplay = ({ data, matches }: any) => {
  const result = adjustGroupArrays(data);
  const groupNumbers = Object.keys(result.groups);

  return (
    <>
      {groupNumbers.map((groupNumber) => {
        const members = result.groups[groupNumber];
        // Skip rendering if the group has no members
        if (members.length === 0) return null;

        return (
          <Group wrap="nowrap" key={`group-${groupNumber}`} mb="xs">
            <Group gap={matches ? 7 : "md"} w={"100%"}>
              <Text bg={"blue.0"} c={"blue.7"} px={"xs"} py={2} styles={{ root: { borderRadius: 5 } }} fz={"xs"} fw={500}>{`${groupNumber}조`}</Text>
              <Group gap={"sm"}>
                {members.map((member: any, index: number) => {
                  if (!member) {
                    return (
                      <Box key={`blank-${index}`} fz={"xs"} w={44} style={{ border: "2px dotted var(--mantine-color-gray-4)", borderRadius: 5 }} py={2} px={5} c={"gray.6"} ta={"center"}>
                        ?
                      </Box>
                    );
                  }
                  return (
                    <Text key={member.userIdx} py={1.5} px={5} fz={matches ? "xs" : "sm"}>
                      {member.userName}
                    </Text>
                  );
                })}
              </Group>
            </Group>
          </Group>
        );
      })}
    </>
  );
};

function LunchGroup() {
  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });
  const queryClient = useQueryClient();
  const [lotteryOpened, { open: lotteryOpen, close: lotteryClose }] = useDisclosure(false);

  const [now] = useState(dayjs().toDate());

  const { data, isLoading, isError } = useApiQuery(["lunchGroup", { current: now }], () => mealService.getLunchGroup());

  const lunchGroup = data?.data.data;

  const notice = lunchGroup?.notice ? lunchGroup?.notice.split(",") : ["-", "-"];

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["lunchGroup"] });

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>점심조 조회를 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (lunchGroup.length === 0) <EmptyView />;
    return <GroupDisplay data={lunchGroup} matches={matches ? "xs" : "sm"} />;
  };

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Group align="flex-start" mb={"md"} justify="space-between">
        <Box>
          <Title order={5}>나의 점심조</Title>
          <Text fz={"xs"} c={"dimmed"}>
            기간 : <Text fz={"xs"} component="span" c={"black"}>{`${dayjs(lunchGroup?.sDate).format("MM월 DD일")} ~ ${dayjs(lunchGroup?.eDate).format("MM월 DD일")}`}</Text>
          </Text>
          <Stack gap={5} mt={"xs"} bg={"#f3faff"} px={"xs"} py={"xs"} styles={{ root: { borderRadius: 5 } }}>
            <Text fz={"xs"} c={"dimmed"}>
              월요일 :
              <Text fz={"xs"} component="span" c={"black"}>
                {notice[0]}
              </Text>
            </Text>
            <Text fz={"xs"} c={"dimmed"}>
              금요일 :
              <Text fz={"xs"} component="span" c={"black"}>
                {notice[1]}
              </Text>
            </Text>
          </Stack>
        </Box>
        <Group>
          <Button onClick={lotteryOpen} size="xs" variant="gradient" leftSection={<Clover />} gradient={{ from: "lime", to: "cyan", deg: 90 }}>
            점심조 뽑기
          </Button>
          <ActionIcon variant="default" onClick={refresh}>
            <RotateCcw />
          </ActionIcon>
        </Group>
      </Group>

      {renderContent()}

      <Modal opened={lotteryOpened} onClose={lotteryClose} title="점심조 뽑기" centered>
        <LotteryComponent lotteryClose={lotteryClose} />
      </Modal>
    </Paper>
  );
}

export default LunchGroup;
