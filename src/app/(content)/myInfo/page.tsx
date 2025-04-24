"use client";
import UpdateBaseInfo from "@/components/myInfo/baseInfo";
import UpdatePassword from "@/components/myInfo/password";
import { Container, Text } from "@mantine/core";

const MyInfo = () => {
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Text size="lg" fw={600} component="a">
        내 정보 수정
      </Text>

      <UpdateBaseInfo />

      <UpdatePassword />
    </Container>
  );
};

export default MyInfo;
