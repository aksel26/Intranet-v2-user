import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";
import dayjs from "dayjs";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const params = {
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  };
  await queryClient.prefetchQuery({
    queryKey: ["approvals"],
    queryFn: () => api.getApprovals(params),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
