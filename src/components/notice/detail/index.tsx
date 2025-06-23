import { noticeService } from "@/api/services/notice/notice.services";
import { useApiQuery } from "@/api/useApi";
import LoadingView from "@/components/loading";
import { convertFileUnit } from "@/utils/file/convertFileUnit";
import { Box, Button, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModifyNotice from "../update";

function NoticeDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [opened, { open, close }] = useDisclosure(false);

  //   const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });

  const { data, isLoading, isError } = useApiQuery(["noticesDetail", { noticeIdx: id }], () => noticeService.getNoticeDetail({ noticeIdx: Number(id) }));
  console.log("data:", data);
  const noticeDetails = data?.data.data;

  function createMarkup(content: string) {
    if (data) {
      return { __html: content };
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
          <LoadingView />
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
            <Box py={"md"} dangerouslySetInnerHTML={createMarkup(noticeDetails?.content)} mih={200} fz={"sm"} />
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

export default NoticeDetails;
