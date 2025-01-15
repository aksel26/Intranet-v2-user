import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  // const now = {
  const pageNo = 1;
  const perPage = 20;
  // };
  await queryClient.prefetchQuery({
    queryKey: ["notices", { pageNo, perPage }],
    queryFn: () => api.getNotices({ pageNo, perPage }),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
