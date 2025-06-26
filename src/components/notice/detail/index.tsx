import { noticeService } from "@/api/services/notice/notice.services";
import { useApiQuery } from "@/api/useApi";
import LoadingView from "@/components/loading";
import { convertFileUnit } from "@/utils/file/convertFileUnit";
import { Box, Button, Group, Modal, Paper, Stack, Table, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModifyNotice from "../update";
import NoticeCategory from "../category";
import Car from "./car";
import { formatTimeFull, formatYYYYMMDD } from "@/utils/date/format";

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
      <Stack gap={1} mb="xs">
        <Title order={4}> 공지/일정</Title>
        <Text c={"gray.6"} fz={"sm"}>
          검사 외의 공지는 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        {isLoading ? (
          <LoadingView />
        ) : (
          <>
            <Group justify="space-between" align="start">
              <Stack gap={2}>
                <Title order={4}>{noticeDetails?.title}</Title>
                <Group>
                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      카테고리
                    </Text>
                    <NoticeCategory record={noticeDetails} />
                  </Group>
                  <Text fz={"sm"} c={"dimmed"}>
                    ·
                  </Text>

                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      작성자
                    </Text>
                    <Text fz={"sm"} c={"dimmed"}>
                      {noticeDetails?.creatorName}
                    </Text>
                  </Group>

                  <Text fz={"sm"} c={"dimmed"}>
                    ·
                  </Text>

                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      작성일
                    </Text>
                    <Text fz={"sm"} c={"dimmed"}>
                      {dayjs(noticeDetails?.createdAt).format("YYYY-MM-DD")}
                    </Text>{" "}
                  </Group>
                </Group>
                <Group>
                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      장소
                    </Text>
                    <Text fz={"sm"} c={"dimmed"}>
                      {noticeDetails?.place}
                    </Text>
                  </Group>

                  <Text fz={"sm"} c={"dimmed"}>
                    ·
                  </Text>
                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      차량 사용
                    </Text>
                    <Car noticeDetails={noticeDetails} />
                  </Group>
                  <Text fz={"sm"} c={"dimmed"}>
                    ·
                  </Text>

                  <Group gap={"xs"}>
                    <Text fz={"sm"} c={"dimmed"}>
                      게시 기간
                    </Text>
                    <Text fz={"sm"} c={"dimmed"}>
                      {`${dayjs(noticeDetails?.startDate).format("YYYY-MM-DD")} ~ ${dayjs(noticeDetails?.endDate).format("YYYY-MM-DD")}`}
                    </Text>{" "}
                  </Group>
                </Group>
              </Stack>
              <Group justify="space-between" align="start" w={"100%"}>
                <Title order={4}>{noticeDetails?.title}</Title>{" "}
                <Group>
                  <Button variant="default" size="xs" onClick={open}>
                    수정하기
                  </Button>
                  <Button variant="outline" size="xs" color="red">
                    삭제하기
                  </Button>
                </Group>
              </Group>

              <Table variant="vertical" layout="fixed" verticalSpacing={3} fz={"xs"}>
                <Table.Tbody>
                  <Table.Tr>
                    <Table.Th w={80}> 카테고리</Table.Th>
                    <Table.Td>
                      <NoticeCategory record={noticeDetails} />
                    </Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>장소</Table.Th>
                    <Table.Td>{noticeDetails.place}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>차량 사용</Table.Th>
                    <Table.Td>
                      <Car noticeDetails={noticeDetails} />
                    </Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>작성자</Table.Th>
                    <Table.Td> {noticeDetails?.creatorName}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>작성일</Table.Th>
                    <Table.Td>{formatYYYYMMDD(noticeDetails?.createdAt)}</Table.Td>
                  </Table.Tr>

                  <Table.Tr>
                    <Table.Th>최종수정</Table.Th>
                    <Table.Td>{noticeDetails?.lastEditorName}</Table.Td>
                  </Table.Tr>
                  <Table.Tr>
                    <Table.Th>최종 수정일</Table.Th>
                    <Table.Td>{formatTimeFull(noticeDetails?.lastUpdateAt)}</Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
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
