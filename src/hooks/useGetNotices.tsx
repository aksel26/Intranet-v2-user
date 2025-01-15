"use client";
import { useQuery } from "@tanstack/react-query";
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
  const { data, isLoading, isError } = useQuery({ queryKey: ["notices", params], queryFn: () => api.getNotices(params) });

  useEffect(() => {
    setNotices(data?.data.data.notices);
  }, [data]);

  return { notices, isLoading, isError };
}

export default useGetNotices;
