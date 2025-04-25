"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
// import * as api from "@/app/api/get/getApi";
import { myInfoStore } from "@/lib/store/myInfoStore";
import api from "@/lib/axios";
function useGetMe() {
  // const [name, setName] = useState(null);

  // useEffect(() => {
  //   if (sessionStorage) {
  //     const st = sessionStorage.getItem("user");
  //     if (st) {
  //       const name = JSON.parse(st).userName;
  //       setName(name);
  //     }
  //   }
  // }, []);

  const { data, isLoading, isError } = useQuery({ queryKey: ["me"], queryFn: () => api.get("/users/me") });
  // const { data, isLoading, isError } = useQuery({ queryKey: ["me", { name: name }], queryFn: () => api.get("/users/me") });
  // const { myInfo, setMyInfo } = myInfoStore();
  console.log("🚀 ~ useGetMe ~ data:", data);
  // useEffect(() => {
  //   data && setMyInfo(data.data.data);
  // }, [data]);
  // return { myInfo, isLoading, isError };
  return { isLoading, isError };
}

export default useGetMe;
