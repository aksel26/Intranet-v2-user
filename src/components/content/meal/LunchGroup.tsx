"use client";

import { ActionIcon, Avatar, Box, Divider, Group, List, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import React from "react";
import IconList from "/public/icons/list.svg";
import IconRefresh from "/public/icons/refresh.svg";
import LunchGroupDetail from "./lunchGroup/LunchGroupDetail";
const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md">
      <Text fz={"sm"} fw={600}>{`${groupNumber}조`}</Text>
    </Avatar>
  );
};

function LunchGroup() {
  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });

  const [opened, { open, close }] = useDisclosure(false);

  console.log("🚀 ~ matches ~ matches:", matches);
  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Group align="flex-start" mb={"md"} justify="space-between">
        <Box>
          <Title order={5}>나의 점심조</Title>
          <Text fz={"xs"} c={"dimmed"}>
            11월 18일까지
          </Text>
        </Box>
        <Group>
          <ActionIcon variant="default" onClick={open}>
            <IconRefresh />
          </ActionIcon>
          <ActionIcon variant="default" onClick={open}>
            <IconList />
          </ActionIcon>
        </Group>
      </Group>
      <Group wrap="nowrap">
        <GroupNumber groupNumber={1} />
        <Group gap={matches ? 7 : "md"} w={"100%"}>
          <Text fz={matches ? "xs" : "sm"}>김현근</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>김현자</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>정진옥</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>박민수</Text>
          <Divider orientation="vertical" size={"sm"} /> <Text fz={matches ? "xs" : "sm"}>박민숙</Text>
        </Group>
      </Group>

      <Modal opened={opened} onClose={close} title="전체 점심조" centered>
        <LunchGroupDetail />
      </Modal>
    </Paper>
  );
}

export default LunchGroup;
