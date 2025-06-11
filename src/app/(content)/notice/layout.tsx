import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
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
        .get(`/users/notices`, { params: { pageNo, perPage } })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  await queryClient.prefetchQuery(prefetchOption);
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
