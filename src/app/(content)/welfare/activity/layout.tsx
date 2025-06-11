import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { dehydrate, HydrationBoundary, queryOptions } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  const apiClient = await createServerApiClient();

  // const now = {
  const year = dayjs().year().toString();
  const halfYear = Number(year) > 6 ? "H2" : "H1";
  // };

  const prefetchOption = queryOptions({
    queryKey: ["activity", { year, halfYear }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/activities`, { params: { year, halfYear } })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });
  await queryClient.prefetchQuery(prefetchOption);
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
