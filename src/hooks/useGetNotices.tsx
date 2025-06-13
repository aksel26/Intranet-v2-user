"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as api from "@/app/api/get/getApi";

interface TNotices {
  params: {
    pageNo: number;
    perPage: number;
  };
}
function useGetNotices({ params }: TNotices) {
  const [notices, setNotices] = useState([]);
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["notices", params],
    queryFn: () => api.getNotices(params).then((res) => res.data),
  });

  useEffect(() => {
    setNotices(data?.data.result);
  }, [data]);

  return { notices, isLoading, isError };
}

export default useGetNotices;
