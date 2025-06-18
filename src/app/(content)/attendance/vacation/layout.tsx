import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { Stack, Text, Title } from "@mantine/core";
import { dehydrate, HydrationBoundary, queryOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const apiClient = await createServerApiClient();
  const params = {
    year: dayjs().year(),
  };

  // vacationSummary 쿼리 옵션
  const vacationSummaryOption = queryOptions({
    queryKey: ["vacationSummary", params],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/leave/stats`, {
          params: params,
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  // vacationAll 쿼리 옵션
  const vacationAllOption = queryOptions({
    queryKey: ["vacationAll", params],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/leave/detail`, {
          params: params,
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  // 두 쿼리를 병렬로 실행
  await Promise.all([queryClient.prefetchQuery(vacationSummaryOption), queryClient.prefetchQuery(vacationAllOption)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack gap={1} mb="xs">
        <Title order={4}>휴가/연차 상세조회</Title>
        <Text c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>
      {children}
    </HydrationBoundary>
  );
}
