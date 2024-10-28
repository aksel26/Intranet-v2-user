import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

export const useGetMe = () => {
  return useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });
};
