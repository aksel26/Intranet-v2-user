"use client";

import { ActionIcon, Avatar, Box, Button, Divider, Group, List, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React, { useState } from "react";
import IconList from "/public/icons/list.svg";
import IconLottery from "/public/icons/clover.svg";
import IconRefresh from "/public/icons/refresh.svg";
import LunchGroupDetail from "./lunchGroup/LunchGroupDetail";
import LotteryComponent from "./Lottery";
import { useQuery } from "@tanstack/react-query";
import * as api from "@/app/api/get/getApi";
import dayjs from "dayjs";
import FetchWrapper from "@/components/fetchWrapper";
const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md">
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
                <React.Fragment key={`member-${groupNumber}-${index}`}>
                  <Text fz={matches ? "xs" : "sm"}>{member}</Text>
                  {/* Add divider after each member except the last one */}
                  {index < members.length - 1 && <Divider orientation="vertical" size={"sm"} />}
                </React.Fragment>
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

  const [now] = useState(dayjs().toDate());

  const { data, isLoading, isError } = useQuery({ queryKey: ["lunchGroup", { current: now }], queryFn: () => api.getLunchGroup() });

  const lunchGroup = data?.data.data;
  const [opened, { open, close }] = useDisclosure(false);
  const [lotteryOpened, { open: lotteryOpen, close: lotteryClose }] = useDisclosure(false);

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <FetchWrapper data={lunchGroup} isLoading={isLoading}>
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
            <ActionIcon variant="default" onClick={open}>
              <IconRefresh />
            </ActionIcon>
            {/* <ActionIcon variant="default" onClick={open}>
              <IconList />
            </ActionIcon> */}
          </Group>
        </Group>
        {/* <Group wrap="nowrap">
          <Group gap={matches ? 7 : "md"} w={"100%"}>

<GroupNumber groupNumber={1} />;
            <Text fz={matches ? "xs" : "sm"}>김현근</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>김현자</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>정진옥</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>박민수</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>박민숙</Text> 
          </Group>
        </Group> */}

        <GroupDisplay data={lunchGroup?.groups} matches={matches ? "xs" : "sm"} />

        {/* <Modal opened={opened} onClose={close} title="전체 점심조" centered>
          <LunchGroupDetail />
        </Modal> */}
        <Modal opened={lotteryOpened} onClose={lotteryClose} title="점심조 뽑기" centered>
          <LotteryComponent lotteryClose={lotteryClose} openGroupList={open} />
        </Modal>
      </FetchWrapper>
    </Paper>
  );
}

export default LunchGroup;
