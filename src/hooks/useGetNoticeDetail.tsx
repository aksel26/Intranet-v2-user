"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import * as api from "@/app/api/get/getApi";

interface TNoticeDetailParam {
  id: number | string | string[];
}

interface TNoticeDetail {
  title: null | string;
  content: string | TrustedHTML;
  imageUrl: null | string;
  imageName: null | string;
  imageSize: null | number;
  createdAt: null | string;
  creatorName: null | string;
}
function useGetNoticeDetail({ id }: TNoticeDetailParam) {
  const [noticeDetails, setNoticeDetails] = useState<TNoticeDetail>();
  const { data, isLoading, isError } = useQuery({ queryKey: ["noticesDetail", id], queryFn: () => api.getNoticeDetail({ noticeIdx: Number(id) }) });
  console.log("🚀 ~ useGetNoticeDetail ~ data:", data);

  useEffect(() => {
    setNoticeDetails(data?.data.data);
  }, [data]);

  return { noticeDetails, isLoading, isError };
}

export default useGetNoticeDetail;
