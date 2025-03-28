import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "@/app/api/get/getApi";
import dayjs from "dayjs";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  // const now = {
  const year = dayjs().year().toString();

  const halfYear = Number(year) > 6 ? "H2" : "H1";
  // };
  await queryClient.prefetchQuery({
    queryKey: ["activity", { year, halfYear }],
    queryFn: () => api.getActivities({ year, halfYear }),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
