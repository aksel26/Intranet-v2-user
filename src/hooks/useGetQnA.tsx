"use client";

import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

export const useGetQnA = () => {
  return useQuery({ queryKey: ["qna"], queryFn: () => api.getQnA() });
};
