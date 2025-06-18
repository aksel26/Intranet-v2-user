"use client";
import PageContainer from "@/components/Global/container";
import UpdateBaseInfo from "@/components/myInfo/baseInfo";
import UpdatePassword from "@/components/myInfo/password";
import { Text, Title } from "@mantine/core";

const MyInfo = () => {
  return (
    <PageContainer>
      <Title order={4}>내 정보 수정</Title>

      <UpdateBaseInfo />

      <UpdatePassword />
    </PageContainer>
  );
};

export default MyInfo;
