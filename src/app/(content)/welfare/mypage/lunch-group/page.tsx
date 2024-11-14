"use client";
import { ActionIcon, Avatar, Divider, Flex, Group, List, Text } from "@mantine/core";
import React from "react";
import Back from "/public/icons/arrow-left.svg";
import { useRouter } from "next/navigation";

const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md">
      <Text>{`${groupNumber}조`}</Text>
    </Avatar>
  );
};
function page() {
  const router = useRouter();
  const goBack = () => router.back();
  return (
    <Flex direction={"column"} pt={"lg"} p={"sm"}>
      <Group gap={"xs"} mb={"xl"}>
        <ActionIcon variant="subtle" onClick={goBack}>
          <Back />
        </ActionIcon>
        <Text size="xl" fw={700}>
          점심조 조회
        </Text>
      </Group>
      <List spacing="lg" size="sm" center>
        <List.Item icon={<GroupNumber groupNumber={1} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">김현자</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">정진옥</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민수</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민숙</Text>
          </Group>
        </List.Item>
        <List.Item icon={<GroupNumber groupNumber={2} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">김현자</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">정진옥</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민수</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민숙</Text>
          </Group>
        </List.Item>
        <List.Item icon={<GroupNumber groupNumber={3} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">김현자</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">정진옥</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민수</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민숙</Text>
          </Group>
        </List.Item>
        <List.Item icon={<GroupNumber groupNumber={4} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">김현자</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">정진옥</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민수</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민숙</Text>
          </Group>
        </List.Item>
        <List.Item icon={<GroupNumber groupNumber={5} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">김현자</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">정진옥</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민수</Text>
            <Divider orientation="vertical" size={"sm"} /> <Text size="sm">박민숙</Text>
          </Group>
        </List.Item>
      </List>
    </Flex>
  );
}

export default page;
