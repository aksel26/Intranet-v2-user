"use client";

import * as api from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { ActionIcon, Avatar, Box, Button, Group, Modal, Paper, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import LotteryComponent from "./Lottery";
import IconLottery from "/public/icons/clover.svg";
import IconRefresh from "/public/icons/refresh.svg";
const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md" size={"md"}>
      <Text fz={"sm"} fw={600}>{`${groupNumber}조`}</Text>
    </Avatar>
  );
};

const GroupDisplay = ({ data, matches }: any) => {
  // Convert the object keys to an array and sort them numerically
  const groupNumbers = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <>
      {groupNumbers.map((groupNumber) => {
        const members = data[groupNumber];

        // Skip rendering if the group has no members
        if (members.length === 0) return null;

        return (
          <Group wrap="nowrap" key={`group-${groupNumber}`} mb="xs">
            <Group gap={matches ? 7 : "md"} w={"100%"}>
              <GroupNumber groupNumber={parseInt(groupNumber)} />

              {/* Map through the members in this group */}
              {members.map((member: any, index: number) => (
                <Text key={index} fz={matches ? "xs" : "sm"}>
                  {member}
                </Text>
              ))}
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

  const { data, isLoading, isError } = useQuery({ queryKey: ["lunchGroup", { current: now }], queryFn: () => api.getLunchGroup() });

  const lunchGroup = data?.data.data;

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["lunchGroup"] });

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>점심조 조회를 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (lunchGroup.length === 0) <EmptyView />;
    return <GroupDisplay data={lunchGroup?.groups} matches={matches ? "xs" : "sm"} />;
  };

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Group align="flex-start" mb={"md"} justify="space-between">
        <Box>
          <Title order={5}>나의 점심조</Title>
          <Text fz={"xs"} c={"dimmed"}>
            {`${dayjs(lunchGroup?.sDate).format("MM월 DD일")}부터 ${dayjs(lunchGroup?.eDate).format("MM월 DD일")} 까지`}
          </Text>
        </Box>
        <Group>
          <Button onClick={lotteryOpen} size="xs" variant="gradient" leftSection={<IconLottery />} gradient={{ from: "lime", to: "cyan", deg: 90 }}>
            점심조 뽑기
          </Button>
          <ActionIcon variant="default" onClick={refresh}>
            <IconRefresh />
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
