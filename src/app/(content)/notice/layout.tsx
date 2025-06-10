import { dehydrate, HydrationBoundary, queryOptions } from "@tanstack/react-query";
import React from "react";
// import * as api from "@/app/api/get/getApi";
import { getNotices } from "@/app/api/get/getApi";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import Notice from "./page";

export default async function layout({ children }: { children: React.ReactNode }) {
  // const queryClient = new QueryClient();
  const queryClient = getQueryClient();

  const pageNo = 1;
  const perPage = 10;
  const pokemonOptions = queryOptions({
    queryKey: ["notices", { pageNo, perPage }],
    queryFn: async () => {
      const response = await getNotices({ pageNo, perPage });
      console.log("response:", response);

      // return response.json();
    },
  });

  // const cookieStore = cookies();
  // const sessionToken = cookieStore.get("jwtToken"); // 실제 쿠키 이름으로 변경

  // const now = {

  // };
  // await queryClient.prefetchQuery({
  //   queryKey: ["notices", { pageNo, perPage }],
  //   queryFn: () => getNotices({ pageNo, perPage }),
  // });

  await queryClient.prefetchQuery(pokemonOptions);

  // await queryClient.prefetchQuery({
  //   queryKey: ["notices", { pageNo, perPage }],
  //   queryFn: () =>
  //     api.getNotices({
  //       pageNo,
  //       perPage,
  //       // API 함수에 토큰 전달
  //       headers: {
  //         Authorization: `Bearer ${sessionToken?.value}`,
  //         // 또는 쿠키를 그대로 전달
  //         Cookie: cookieStore.toString(),
  //       },
  //     }),
  // });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="text-3xl mt-48">dfssdfddsf</div>
      {/* {children} */}
      <Notice />
    </HydrationBoundary>
  );
}
