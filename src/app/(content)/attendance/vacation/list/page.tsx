"use client";

import "@/styles/calendar.css";
import { Breadcrumbs, Container, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
const items = [
  { title: "휴가/연차 관리", href: "#" },
  { title: "내 휴가 사용내역", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));

const CountText = ({ children }: any) => {
  return <Text size="xs">{children}</Text>;
};
function page() {
  const [opened, { open, close }] = useDisclosure(false);

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
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
    </Container>
  );
}

export default page;
