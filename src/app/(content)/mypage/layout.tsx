import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import React from "react";
import * as api from "../../api/get/getApi";

export default async function layout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["me"],
    queryFn: () => api.getMe(),
  });
  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>;
}
