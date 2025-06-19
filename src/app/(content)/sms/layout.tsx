import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";
import { Stack, Text, Title } from "@mantine/core";

export default async function layout({ children }: { children: React.ReactNode }) {
  //   const queryClient = new QueryClient();
  //   await queryClient.prefetchQuery({
  //     queryKey: ["me"],
  //     queryFn: () => api.getMe(),
  //   });
  return (
    <>
      <Stack gap={1} mb="xs">
        <Title order={4}>안내 SMS 전송</Title>
        <Text c={"gray.6"} fz={"sm"}>
          안내 SMS 전송 및 현황을 확인할 수 있습니다.
        </Text>
      </Stack>
      {children}
    </>
  );
}
