import { getLunchGroup } from "@/app/api/get/getApi";
import { ActionIcon, Avatar, Box, Divider, Flex, Group, List, LoadingOverlay, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const GroupNumber = ({ groupNumber }: { groupNumber: number }) => {
  return (
    <Avatar color="blue" radius="md">
      <Text>{`${groupNumber}조`}</Text>
    </Avatar>
  );
};
function LunchGroupDetail() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["lunchGroup"], queryFn: () => getLunchGroup() });

  if (!data?.data.data.groups)
    return (
      <Text ta={"center"} fz={"sm"} c={"dimmed"} py={"xl"}>
        뽑기진행 준비중입니다.
      </Text>
    );
  return (
    <Box p={"sm"}>
      <Group mb={"lg"}>
        <Stack gap={2}>
          <Text size="xs" c={"dimmed"}>
            기간
          </Text>
          <Text size="xs" c={"dimmed"} component="span">
            {data?.data.data.sDate} ~ {data?.data.data.eDate}
          </Text>
        </Stack>
      </Group>

      {isLoading ? (
        <LoadingOverlay visible zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      ) : (
        <List spacing="md" size="sm" center>
          {Object.entries(data?.data.data.groups)?.map((item: any, index: number) => (
            <List.Item icon={<GroupNumber groupNumber={item[0]} />} key={index}>
              <Group gap={"xl"} ml={"lg"}>
                {item[1].length === 0 ? (
                  <Text size="xs" c={"dimmed"}>
                    아직 배정인원이 없어요.
                  </Text>
                ) : (
                  item[1].map((name: string, index: number, arr: any) => {
                    return (
                      <React.Fragment key={index}>
                        <Text size="sm">{name}</Text>
                        {arr.length === index + 1 ? null : <Divider orientation="vertical" size={"xs"} />}
                      </React.Fragment>
                    );
                  })
                )}
              </Group>
            </List.Item>
          ))}
        </List>
      )}
    </Box>
  );
}

export default LunchGroupDetail;
