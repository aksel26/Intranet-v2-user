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
  //   const params = {
  //     year: dayjs().year(),
  //   };

  // vacationSummary 쿼리 옵션
  const attendanceAllStaffOption = queryOptions({
    queryKey: [
      "attendanceAllStaff",
      { year: dayjs().year(), month: dayjs().month() + 1 },
    ],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/leave/all/calender`, {
          params: { year: dayjs().year(), month: dayjs().month() + 1 },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });
  const DashboardNoticedOption = queryOptions({
    queryKey: ["notices", { pageNo: 20, perPgae: 1 }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/notices`, {
          params: { pageNo: 20, perPgae: 1 },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  const DashboardBirthOption = queryOptions({
    queryKey: ["birth", { month: (dayjs().month() + 1).toString() }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/birth`, {
          params: { month: (dayjs().month() + 1).toString() },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  const DashboardVacationOption = queryOptions({
    queryKey: ["vacationSummary", { year: dayjs().year() + 1 }],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/leave/stats`, {
          params: { year: dayjs().year() + 1 },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });
  const DashboardWorkHoursOption = queryOptions({
    queryKey: [
      "workHours",
      { year: dayjs().year(), month: dayjs().month() + 1 },
    ],
    queryFn: async () => {
      const res = await apiClient
        .get(`/users/intranet/commute/work-hours`, {
          params: { year: dayjs().year(), month: dayjs().month() + 1 },
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((error) => console.log(error));
      return res;
    },
  });

  // 두 쿼리를 병렬로 실행
  await Promise.all([
    queryClient.prefetchQuery(attendanceAllStaffOption),
    queryClient.prefetchQuery(DashboardNoticedOption),
    queryClient.prefetchQuery(DashboardBirthOption),
    queryClient.prefetchQuery(DashboardVacationOption),
    queryClient.prefetchQuery(DashboardWorkHoursOption),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
