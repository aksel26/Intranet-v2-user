"use client";

import useGetNoticeDetail from "@/hooks/useGetNoticeDetail";
import { convertFileUnit } from "@/utils/convertFileUnit";
import { ActionIcon, Box, Breadcrumbs, Button, Container, Divider, Group, Modal, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import IconLeft from "/public/icons/arrow-left.svg";

const items = [{ title: "공지사항", href: "#" }].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {item.title}
  </Text>
));

function page() {
  const { id } = useParams();

  const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });
  function createMarkup() {
    if (noticeDetails) {
      return { __html: noticeDetails?.content };
    }
  }

  const [previewOpened, { open: previewOpen, close: previewClose }] = useDisclosure(false);

  const router = useRouter();

  const back = () => router.push(`/notice`);

  return (
    <Container
      fluid
      p={"lg"}
      style={{
        scrollPaddingBottom: "52px",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <Group align="center" mb={"md"}>
        <ActionIcon variant="subtle" color="gray" onClick={back}>
          <IconLeft style={{ width: "70%", height: "70%" }} />
        </ActionIcon>
        <Breadcrumbs>{items}</Breadcrumbs>
      </Group>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        <Stack gap={"md"}>
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
          <Divider />
          <Stack>
            <Box dangerouslySetInnerHTML={createMarkup()} mih={200} fz={"sm"} />
            <Divider />

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
          </Stack>
        </Stack>
      </Paper>
      <Modal opened={previewOpened} onClose={previewClose} title="첨부 이미지 미리보기">
        <img src={noticeDetails?.imageUrl || ""} alt="preview" />
      </Modal>
    </Container>
  );
}

export default page;
