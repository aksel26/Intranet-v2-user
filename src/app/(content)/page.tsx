"use client";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

const Page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        const targetKeys = ["me", "noticeNew", "approvalNew", "vacationSummary", "notices", "workHours", "attendanceAllStaff", "vacationAll"];
        return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
      },
    });
  }, []);

  return <div>{children}</div>;
};

export default Page;
