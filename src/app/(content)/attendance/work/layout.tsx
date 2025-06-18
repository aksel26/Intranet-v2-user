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
    pageNo: 1,
    perPage: 31,
    sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
    eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
  };

  const prefetchOption = queryOptions({
    queryKey: ["attendanceAll", params],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/commute`, {
          params: params,
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
      <Stack gap={1}>
        <Title order={4}>출퇴근 관리</Title>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 출퇴근 내역을 조회합니다.
        </Text>
      </Stack>
      {children}
    </HydrationBoundary>
  );
}
