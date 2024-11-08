"use client";

import { ActionIcon, Badge, Button, Center, Checkbox, Divider, Flex, Group, Loader, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import Back from "../../../../../public/icons/arrow-left.svg";
import Empty from "../../../../../public/icons/no-list.svg";

import * as api from "../../../api/get/getApi";

function page() {
  const router = useRouter();
  const currentPath = usePathname();

  const { data, isLoading, isError } = useQuery({ queryKey: ["qna"], queryFn: () => api.getQnA() });

  const goBack = () => router.back();
  const writeQna = () => {
    router.push(`${currentPath}/contact-us`);
  };

  return (
    <>
      <Flex direction={"column"} pt={"lg"} rowGap={"md"}>
        <Group justify="space-between">
          <Group gap={"xs"}>
            <ActionIcon variant="subtle" onClick={goBack}>
              <Back />
            </ActionIcon>
            <Text size="xl" fw={700}>
              문의내역
            </Text>
          </Group>
          <Button size="xs" variant="light" onClick={writeQna}>
            작성하기
          </Button>
        </Group>

        {isLoading ? (
          <Center h={"55svh"}>
            <Loader size="md" type="dots" />
          </Center>
        ) : data?.data.data.length < 1 ? (
          <Center>
            <Stack justify="center" align="center">
              <Empty width="50" height="50" strokeWidth={1.5} color="#858e96" />
              <Text ta={"center"} c={"gray.6"}>
                작성내용이 없습니다.
              </Text>
            </Stack>
          </Center>
        ) : (
          data?.data.data.map((item: any, index: number) => (
            <Flex align={"center"} wrap={"nowrap"} columnGap={"md"} key={index}>
              <Checkbox />
              <Button
                key={index}
                justify="space-between"
                variant="subtle"
                fullWidth
                size="xl"
                px={"md"}
                radius={"lg"}
                rightSection={<Badge color="blue">{item.replySuccessYN === "Y" ? <>답변완료</> : <>미완료</>}</Badge>}
              >
                <Group>
                  <Stack gap={0} align="start">
                    <Text c={"gray.8"} fw={600}>
                      {item.text}
                    </Text>
                    <Text c={"gray.6"} size="sm">
                      {dayjs(item.createdAt).format("MM월 DD일 dddd")}
                    </Text>
                  </Stack>
                </Group>
              </Button>
            </Flex>
          ))
        )}
      </Flex>
    </>
  );
}

export default page;
