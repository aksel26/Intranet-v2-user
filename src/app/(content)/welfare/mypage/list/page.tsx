"use client";

import { ActionIcon, Badge, Button, Center, Checkbox, Divider, Flex, Group, Loader, Menu, Modal, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import Back from "/public/icons/arrow-left.svg";
import Empty from "/public/icons/no-list.svg";

import * as api from "@/app/api/get/getApi";
import { useDeleteQna } from "@/hooks/useSubmitForm";
import { useState } from "react";
import notification from "@/components/GNB/Notification";
import ArrowRight from "/public/icons/arrow-right.svg";
import { useDisclosure } from "@mantine/hooks";
function page() {
  const router = useRouter();
  const currentPath = usePathname();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({ queryKey: ["qna"], queryFn: () => api.getQnA() });
  const { mutate } = useDeleteQna();

  const [deleteList, setDeleteList] = useState([]);

  const goBack = () => router.back();
  const writeQna = () => router.push(`${currentPath}/contact-us`);
  const deleteQna = () => {
    mutate(
      { qnaIdxList: deleteList },
      {
        onSuccess: async () => {
          await queryClient.invalidateQueries({ queryKey: ["activity"] });
          notification({
            title: "Q&A",
            color: "green",
            message: "Q&A 내역이 삭제되었습니다.",
          });
        },
      }
    );
  };

  const handleCheckboxChange = (e: any) => {
    const list = Number(e.target.value);
    setDeleteList((prev: any) => {
      // 이미 배열에 있는 경우 제거
      if (prev.includes(list)) {
        return prev.filter((item: any) => item !== list);
      }
      // 배열에 없는 경우 추가
      return [...prev, list];
    });
  };

  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Flex direction={"column"} pt={"lg"} rowGap={"md"} h="100%">
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
        <Center h={"100%"}>
          <Loader size="md" type="dots" />
        </Center>
      ) : data?.data.data.length < 1 ? (
        <Center h="100%">
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
            {/* <Checkbox size="xs" value={Number(item.qnaIdx)} onChange={handleCheckboxChange} /> */}
            <Button
              key={index}
              onClick={open}
              justify="space-between"
              variant="subtle"
              fullWidth
              size="xl"
              px={"md"}
              radius={"lg"}
              rightSection={<ArrowRight color="#2f9e44" />}
              // rightSection={
              //   <Menu shadow="lg">
              //     <Menu.Target>
              //       <ActionIcon variant="outline">
              //         <More />
              //       </ActionIcon>
              //     </Menu.Target>
              //     <Menu.Dropdown>
              //       <Menu.Item color="red" leftSection={<Trash />}>
              //         삭제하기
              //       </Menu.Item>
              //       <Menu.Item leftSection={<Edit />}>수정하기</Menu.Item>
              //     </Menu.Dropdown>
              //   </Menu>
              // }
            >
              <Group>
                <Stack gap={0} align="start">
                  <Text c={"gray.8"} fw={600}>
                    {item.text}
                  </Text>
                  <Group>
                    <Text c={"gray.6"} size="sm">
                      {dayjs(item.createdAt).format("MM월 DD일 dddd")}
                    </Text>
                    <Badge color="blue">{item.replySuccessYN === "Y" ? <>답변완료</> : <>미완료</>}</Badge>
                  </Group>
                </Stack>
              </Group>
            </Button>
          </Flex>
        ))
      )}
      <Modal centered opened={opened} onClose={close} title="작성한 문의 내용">
        <Stack gap={"xs"}>
          <Text size="sm">작성일 : 2022-11-11</Text>
          <Group gap={"xs"}>
            <Text size="sm">답변상태 : </Text>
            <Badge color="blue">미완료</Badge>
          </Group>
          <Divider size={"xs"} my={"md"} />
          <Text size="sm">문의내용문의내용문의내용문의내용문의내용문의내용문의내용문의내용문의내용문의내용</Text>
          <Divider size={"xs"} my={"md"} />
          <Group wrap="nowrap">
            <Button size="xs" fullWidth variant="light">
              수정하기
            </Button>
            <Button size="xs" onClick={deleteQna} fullWidth variant="light" color="red">
              삭제하기
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Flex>
  );
}

export default page;
