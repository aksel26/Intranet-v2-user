import { useQuery } from "@tanstack/react-query";
import * as api from "../app/api/get/getApi";

export const useGetUsers = () => {
  return useQuery({ queryKey: ["users"], queryFn: () => api.getUsers() });
};
