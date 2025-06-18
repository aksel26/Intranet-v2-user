"use client";

import ModifyNotice from "@/components/notice/modify";
import useGetNoticeDetail from "@/hooks/useGetNoticeDetail";
import { convertFileUnit } from "@/utils/convertFileUnit";
import { Box, Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

function page() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [opened, { open, close }] = useDisclosure(false);

  const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });
  function createMarkup() {
    if (noticeDetails) {
      return { __html: noticeDetails?.content };
    }
  }

  const [previewOpened, { open: previewOpen, close: previewClose }] = useDisclosure(false);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notices"] });
    queryClient.invalidateQueries({ queryKey: ["noticeNew"] });
  }, []);

  return (
    <>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Group justify="space-between" align="start">
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
              <Group>
                <Button variant="default" size="xs" onClick={open}>
                  수정하기
                </Button>
                <Button variant="outline" size="xs" color="red">
                  삭제하기
                </Button>
              </Group>
            </Group>
            <Box py={"md"} dangerouslySetInnerHTML={createMarkup()} mih={200} fz={"sm"} />
            <Text fz={"sm"}>첨부파일</Text>
            {noticeDetails?.imageUrl ? (
              <Button fz={"sm"} variant="subtle" w={"max-content"} onClick={previewOpen}>
                {`${noticeDetails?.imageName}, [${convertFileUnit(noticeDetails?.imageSize)}]`}
              </Button>
            ) : (
              <Text fz={"sm"} c={"dimmed"}>
                첨부파일이 존재하지 않습니다.
              </Text>
            )}
          </>
        )}
      </Paper>

      <Modal opened={previewOpened} onClose={previewClose} title="첨부 이미지 미리보기">
        <img src={noticeDetails?.imageUrl || ""} alt="preview" />
      </Modal>
      <ModifyNotice opened={opened} close={close} details={noticeDetails} />
    </>
  );
}

export default page;
