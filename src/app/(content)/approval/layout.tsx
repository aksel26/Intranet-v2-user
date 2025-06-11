import PageContainer from "@/components/Global/container";
import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { Stack, Text } from "@mantine/core";
import {
  dehydrate,
  HydrationBoundary,
  queryOptions,
} from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();
  const apiClient = await createServerApiClient();
  const params = {
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  };

  const prefetchOption = queryOptions({
    queryKey: ["approvals", params],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/approval`, {
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
        <Text size="lg" fw={600} component="a">
          결재 및 승인{" "}
          <Text component="span" fz={"sm"} c={"dimmed"} ml={"sm"}>
            {/* {approvalsList?.length}건 */}
          </Text>
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          결재 및 승인 요청 내역이 보여지며, 참조 내역도 확인할 수 있습니다.
        </Text>
      </Stack>
      {children}
    </HydrationBoundary>
  );
}
