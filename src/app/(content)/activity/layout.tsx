import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "../../api/get/getApi";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  // const now = {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  // };
  await queryClient.prefetchQuery({
    queryKey: ["activity", { year, month }],
    queryFn: () => api.getActivities({ year, month }),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
