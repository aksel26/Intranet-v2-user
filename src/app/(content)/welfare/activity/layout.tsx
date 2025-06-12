import ActivityInputForm from "@/components/content/activity/ActivityInputForm";
import { createServerApiClient } from "@/lib/axios/server-api";
import { getQueryClient } from "@/lib/query-client/get-query-client";
import { Grid, GridCol, Paper, Title } from "@mantine/core";
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
        .get(`/users/activities`, {
          params: { year, halfYear },
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
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>{children}</GridCol>
        <GridCol span={{ base: 12, md: 4 }} visibleFrom="md">
          <Paper bg={"white"} py="lg" px={"lg"} radius={"lg"}>
            <Title order={5} mb={"md"}>
              활동비 입력
            </Title>

            <ActivityInputForm />
          </Paper>
        </GridCol>
      </Grid>
    </HydrationBoundary>
  );
}
