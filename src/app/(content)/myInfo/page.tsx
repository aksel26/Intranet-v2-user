"use client";
import PageContainer from "@/components/Global/container";
import UpdateBaseInfo from "@/components/myInfo/baseInfo";
import UpdatePassword from "@/components/myInfo/password";
import { Text } from "@mantine/core";

const MyInfo = () => {
  return (
    <PageContainer>
      <Text size="lg" fw={600} component="a">
        내 정보 수정
      </Text>

      <UpdateBaseInfo />

      <UpdatePassword />
    </PageContainer>
  );
};

export default MyInfo;
