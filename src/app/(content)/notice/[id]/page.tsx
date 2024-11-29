"use client";

import { Breadcrumbs, Container, Group, Input, Paper, Stack, Text, Textarea } from "@mantine/core";
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
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
        <Stack>
          <Group justify="space-between">
            <Input.Wrapper label="작성자">
              <Input value={"P&C팀 안지훈 위원"} readOnly variant="unstyled" />
            </Input.Wrapper>
            <Input.Wrapper label="작성일">
              <Input value={"2024-12-12"} readOnly variant="unstyled" />
            </Input.Wrapper>
          </Group>
          <Input.Wrapper label="제목">
            <Input
              value={
                "Non quis irure laboris ex pariatur consequat esse fugiat exercitation ad non. Elit do incididunt aliquip adipisicing non. Sint amet adipisicing excepteur magna irure fugiat deserunt in dolor. Laborum consequat nisi culpa. Consequat sunt eu ipsum."
              }
              readOnly
              variant="unstyled"
            />
          </Input.Wrapper>

          <Textarea
            label="공지 내용"
            readOnly
            autosize
            value={
              "Adipisicing sint aliquip enim do sunt adipisicing in occaecat eu laborum minimAdipisicing sint aliquip enim do sunt adipisicing in occaecat eu laborum minimAdipisicing sint aliquip enim do sunt adipisicing in occaecat eu laborum minimAdipisicing sint aliquip enim do sunt adipisicing in occaecat eu laborum minim."
            }
            variant="unstyled"
            styles={{ root: { height: "auto" } }}
          />
        </Stack>
      </Paper>
    </Container>
  );
}

export default page;
