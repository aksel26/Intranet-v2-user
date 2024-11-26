import { ActionIcon, Avatar, Box, Divider, Flex, Group, List, Stack, Text } from "@mantine/core";
import React from "react";

const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md">
      <Text>{`${groupNumber}조`}</Text>
    </Avatar>
  );
};
function LunchGroupDetail() {
  return (
    <Box p={"sm"}>
      <Group mb={"lg"}>
        <Stack gap={2}>
          <Text size="xs" c={"dimmed"}>
            기간
          </Text>
          <Text size="xs" c={"dimmed"} component="span">
            11/29 까지
          </Text>
        </Stack>
        <Stack gap={2}>
          <Text size="xs" c={"dimmed"}>
            다음 예정
          </Text>
          <Text size="xs" c={"dimmed"} component="span">
            11/29 까지
          </Text>
        </Stack>
      </Group>
      <List spacing="lg" size="sm" center>
        <List.Item icon={<GroupNumber groupNumber={1} />}>
          <Group gap={"sm"}>
            <Text size="sm">김현근</Text>
            <Divider orientation="vertical" size={"sm"} />{" "}
            <Text component="span" size="sm">
              김현자
            </Text>
            <Divider orientation="vertical" size={"sm"} />{" "}
            <Text component="span" size="sm">
              정진옥
            </Text>
            <Divider orientation="vertical" size={"sm"} />{" "}
            <Text component="span" size="sm">
              박민수
            </Text>
            <Divider orientation="vertical" size={"sm"} />{" "}
            <Text component="span" size="sm">
              박민숙
            </Text>
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
        <List.Item icon={<GroupNumber groupNumber={5} />}>
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
        <List.Item icon={<GroupNumber groupNumber={5} />}>
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
        <List.Item icon={<GroupNumber groupNumber={5} />}>
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
    </Box>
  );
}

export default LunchGroupDetail;
