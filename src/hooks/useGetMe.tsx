"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import * as api from "@/app/api/get/getApi";
import { myInfoStore } from "@/lib/store/myInfoStore";
function useGetMe() {
  const { data, isLoading, isError } = useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });
  const { myInfo, setMyInfo } = myInfoStore();
  useEffect(() => {
    data && setMyInfo(data.data.data);
  }, [data]);
  return { myInfo, isLoading, isError };
}

export default useGetMe;
