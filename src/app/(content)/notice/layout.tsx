import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { Group, Paper, Stack, Text, Title } from "@mantine/core";
import { dehydrate, HydrationBoundary, queryOptions } from "@tanstack/react-query";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const apiClient = await createServerApiClient();

  const pageNo = 1;
  const perPage = 20;

  const prefetchOption = queryOptions({
    queryKey: ["notices", { pageNo, perPage }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/notices`, {
          params: { pageNo, perPage },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  await queryClient.prefetchQuery(prefetchOption);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={1} mb="xs">
        <Group justify="space-between">
          <Title order={4}> 공지/일정</Title>
        </Group>
        <Text c={"gray.6"} fz={"sm"}>
          검사 외의 공지는 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Stack>
      {children}
    </HydrationBoundary>
  );
}
