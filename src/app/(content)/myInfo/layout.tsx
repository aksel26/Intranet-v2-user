import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";
import { Stack, Text, Title } from "@mantine/core";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["me"],
    queryFn: () => api.getMe(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={1} mb="xs">
        <Title order={4}>내 정보 수정</Title>
        <Text c={"gray.6"} fz={"sm"}>
          비밀번호 변경, 기본 정보 수정 등을 할 수 있습니다.
        </Text>
      </Stack>
      {children}
    </HydrationBoundary>
  );
}
