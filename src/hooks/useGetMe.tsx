"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as api from "@/app/api/get/getApi";
import { myInfoStore } from "@/lib/store/myInfoStore";
function useGetMe() {
  const [name, setName] = useState(null);

  useEffect(() => {
    if (sessionStorage) {
      const st = sessionStorage.getItem("user");
      if (st) {
        const name = JSON.parse(st).userName;
        setName(name);
      }
    }
  }, []);

  const { data, isLoading, isError } = useQuery({ queryKey: ["me", { name: name }], queryFn: () => api.getMe() });
  const { myInfo, setMyInfo } = myInfoStore();
  useEffect(() => {
    data && setMyInfo(data.data.data);
  }, [data]);
  return { myInfo, isLoading, isError };
}

export default useGetMe;
