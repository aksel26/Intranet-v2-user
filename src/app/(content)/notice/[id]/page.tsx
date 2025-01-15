"use client";

import useGetNoticeDetail from "@/hooks/useGetNoticeDetail";
import { convertFileUnit } from "@/utils/convertFileUnit";
import { Box, Breadcrumbs, Button, Container, Divider, Group, Input, Paper, Skeleton, Stack, Text, Textarea, TextInput, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import React from "react";
const items = [
  { title: "공지사항", href: "#" },
  { title: "공지사항 상세내용", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={700} component="a" key={index}>
    {item.title}
  </Text>
));

function page() {
  const { id } = useParams();

  const { noticeDetails, isLoading, isError } = useGetNoticeDetail({ id });
  console.log("🚀 ~ page ~ noticeDetails:", noticeDetails);
  function createMarkup() {
    if (noticeDetails) {
      return { __html: noticeDetails?.content };
    }
  }
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        <Stack gap={"sm"}>
          <Title order={3}>{noticeDetails?.title}</Title>

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

          <Divider />

          <Stack>
            <Box dangerouslySetInnerHTML={createMarkup()} mih={200} />
            <Divider />

            <Text fz={"sm"}>첨부파일</Text>
            {noticeDetails?.imageUrl ? (
              <Button fz={"sm"} variant="subtle" w={"max-content"}>
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
    </Container>
  );
}

export default page;
