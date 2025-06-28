import { noticeService } from "@/api/services/notice/notice.services";
import { useApiQuery } from "@/api/useApi";
import LoadingView from "@/components/loading";
import { convertFileUnit } from "@/utils/file/convertFileUnit";
import {
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ModifyNotice from "../update";
import NoticeCategory from "../category";
import Car from "./car";
import { formatTimeFull, formatYYYYMMDD } from "@/utils/date/format";
import People from "./people";

function NoticeDetails() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [opened, { open, close }] = useDisclosure(false);

  //   const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });

  const { data, isLoading, isError } = useApiQuery(
    ["noticesDetail", { noticeIdx: id }],
    () => noticeService.getNoticeDetail({ noticeIdx: Number(id) })
  );
  console.log("data:", data);
  const noticeDetails = data?.data.data[0];

  function createMarkup(content: string) {
    if (data) {
      return { __html: content };
    }
  }

  const [previewOpened, { open: previewOpen, close: previewClose }] =
    useDisclosure(false);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notices"] });
    queryClient.invalidateQueries({ queryKey: ["noticeNew"] });
  }, []);

  const LABEL_WIDTH = 70;

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
            <Group justify="space-between" align="start" w={"100%"}>
              <Stack gap={"xs"} w={"100%"}>
                <Group gap={"xs"}>
                  <Title order={4}>{noticeDetails?.title}</Title>
                  <NoticeCategory record={noticeDetails} />
                </Group>
                <Group gap={"xs"} justify="space-between">
                  <Group>
                    <Stack gap={2}>
                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          장소
                        </Text>
                        <Text fz={"xs"} c={"dimmed"}>
                          {noticeDetails?.place}
                        </Text>
                      </Group>

                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          차량 사용
                        </Text>
                        <Car noticeDetails={noticeDetails} />
                      </Group>
                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          참석자
                        </Text>
                        <People list={noticeDetails.attendeeInfo} />
                      </Group>
                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          참조
                        </Text>
                        <People list={noticeDetails.ccUserInfo} />
                      </Group>
                    </Stack>
                  </Group>

                  <Group>
                    <Stack gap={1}>
                      <Group gap={"xs"}>
                        <Text
                          fz={"xs"}
                          c={"dimmed"}
                          w={{ base: LABEL_WIDTH, md: 50 }}
                        >
                          작성자
                        </Text>
                        <Text fz={"xs"} c={"dimmed"}>
                          {noticeDetails?.creatorName}
                        </Text>
                      </Group>

                      <Group gap={"xs"}>
                        <Text
                          fz={"xs"}
                          c={"dimmed"}
                          w={{ base: LABEL_WIDTH, md: 50 }}
                        >
                          작성일
                        </Text>
                        <Text fz={"xs"} c={"dimmed"}>
                          {dayjs(noticeDetails?.createdAt).format("YYYY-MM-DD")}
                        </Text>{" "}
                      </Group>
                    </Stack>
                    <Stack gap={1}>
                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          수정
                        </Text>
                        <Text fz={"xs"} c={"dimmed"}>
                          {noticeDetails?.lastEditorName}
                        </Text>
                      </Group>

                      <Group gap={"xs"}>
                        <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                          최종 수정일
                        </Text>
                        <Text fz={"xs"} c={"dimmed"}>
                          {formatTimeFull(noticeDetails?.lastUpdateAt)}
                        </Text>{" "}
                      </Group>
                    </Stack>
                  </Group>
                </Group>
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"dimmed"} w={LABEL_WIDTH}>
                    게시 기간
                  </Text>
                  <Text fz={"xs"} c={"dimmed"}>
                    {`${dayjs(noticeDetails?.startDate).format(
                      "YYYY-MM-DD"
                    )} ~ ${dayjs(noticeDetails?.endDate).format("YYYY-MM-DD")}`}
                  </Text>{" "}
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
            </Group>
            <Box
              py={"md"}
              dangerouslySetInnerHTML={createMarkup(noticeDetails?.content)}
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
          </>
        )}
      </Paper>

      <Modal
        opened={previewOpened}
        onClose={previewClose}
        title="첨부 이미지 미리보기"
      >
        <img src={noticeDetails?.imageUrl || ""} alt="preview" />
      </Modal>
      <ModifyNotice opened={opened} close={close} details={noticeDetails} />
    </>
  );
}

export default NoticeDetails;
