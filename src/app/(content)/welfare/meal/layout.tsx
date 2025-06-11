import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
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

  // const now = {
  const year = dayjs().year().toString();
  const month = (dayjs().month() + 1).toString();
  // };

  const prefetchOption = queryOptions({
    queryKey: ["meals", { year, month }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/meals`, { params: { year, month }, withCredentials: true })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });
  await queryClient.prefetchQuery(prefetchOption);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
