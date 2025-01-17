"use client";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  List,
  ListItem,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
const items = [
  { title: "기타메뉴", href: "#" },
  { title: "설문/리뷰", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {item.title}
  </Text>
));
function page() {
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
      <Breadcrumbs separator=">" mb={"md"}>
        {items}
      </Breadcrumbs>

      <Stack>
        <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
          <Title order={5}>현재 진행중인 설문</Title>
          <List spacing={"sm"}>
            <ListItem>
              <Anchor component={Link} href="#" fz={"sm"}>
                Monthly Meeting 음료취합
              </Anchor>
            </ListItem>

            <ListItem>
              <Anchor component={Link} href="#" fz={"sm"}>
                ACG 하계 워크샵 설문조사
              </Anchor>
            </ListItem>

            <ListItem>
              <Anchor component={Link} href="#" fz={"sm"}>
                직원 다면평가
              </Anchor>
            </ListItem>
          </List>
        </Paper>

        <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
          <Title order={5}>완료된 진행중인 설문</Title>
          <List spacing={"sm"}>
            <ListItem>
              <Anchor component={Link} href="#" fz={"sm"}>
                컨퍼런스 참여 설문조사
              </Anchor>
            </ListItem>
          </List>
        </Paper>
      </Stack>
    </Container>
  );
}

export default page;
