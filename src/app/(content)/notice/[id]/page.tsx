"use client";

import PageContainer from "@/components/Global/container";
import useGetNoticeDetail from "@/hooks/useGetNoticeDetail";
import { convertFileUnit } from "@/utils/convertFileUnit";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import IconLeft from "/public/icons/arrow-left.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ModifyNotice from "@/components/notice/modify";

function page() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [opened, { open, close }] = useDisclosure(false);

  const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });
  console.log("noticeDetails: ", noticeDetails);
  function createMarkup() {
    if (noticeDetails) {
      return { __html: noticeDetails?.content };
    }
  }

  const [previewOpened, { open: previewOpen, close: previewClose }] =
    useDisclosure(false);

  const router = useRouter();

  const back = () => router.push(`/notice`);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notices"] });
    queryClient.invalidateQueries({ queryKey: ["noticeNew"] });
  }, []);

  const [details, setDetails] = useState();

  return (
    <PageContainer>
      <Group align="center" mb={"md"}>
        <ActionIcon variant="subtle" color="gray" onClick={back}>
          <IconLeft style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
        <Text size="lg" fw={600}>
          공지/일정
        </Text>
      </Group>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        <Stack gap={2}>
          <Title order={4}>{noticeDetails?.title}</Title>
          <Group>
            <Group>
              <Text fz={"sm"} c={"dimmed"}>
                작성일
              </Text>
              <Text fz={"sm"} c={"dimmed"}>
                {dayjs(noticeDetails?.createdAt).format("YYYY-MM-DD")}
              </Text>{" "}
            </Group>
            <Text fz={"sm"} c={"dimmed"}>
              ·
            </Text>
            <Group>
              <Text fz={"sm"} c={"dimmed"}>
                작성자
              </Text>
              <Text fz={"sm"} c={"dimmed"}>
                {noticeDetails?.creatorName}
              </Text>
            </Group>
          </Group>
        </Stack>
        <Box
          py={"md"}
          dangerouslySetInnerHTML={createMarkup()}
          mih={200}
          fz={"sm"}
        />
        <Text fz={"sm"}>첨부파일</Text>
        {noticeDetails?.imageUrl ? (
          <Button
            fz={"sm"}
            variant="subtle"
            w={"max-content"}
            onClick={previewOpen}
          >
            {`${noticeDetails?.imageName}, [${convertFileUnit(
              noticeDetails?.imageSize
            )}]`}
          </Button>
        ) : (
          <Text fz={"sm"} c={"dimmed"}>
            첨부파일이 존재하지 않습니다.
          </Text>
        )}
      </Paper>
      <Group justify="flex-end" mt={"xs"}>
        <Button variant="light" size="xs" onClick={open}>
          수정하기
        </Button>
        <Button variant="light" size="xs" color="red">
          삭제하기
        </Button>
      </Group>
      <Modal
        opened={previewOpened}
        onClose={previewClose}
        title="첨부 이미지 미리보기"
      >
        <img src={noticeDetails?.imageUrl || ""} alt="preview" />
      </Modal>
      <ModifyNotice opened={opened} close={close} details={noticeDetails} />
    </PageContainer>
  );
}

export default page;
