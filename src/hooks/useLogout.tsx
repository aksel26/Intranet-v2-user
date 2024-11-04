"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "../app/api/post/postApi";
export default function useLogout() {
  return useMutation({
    mutationFn: () => api.logout(),
  });
}
