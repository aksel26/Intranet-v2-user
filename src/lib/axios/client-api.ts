import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    if (typeof window !== "undefined") {
      console.log("👀");
      const session = await getSession();
      console.log("session:", session);
      if (session?.accessToken) {
        config.headers["Authorization"] = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      // 401 에러 시 로그아웃
      window.location.href = "/";
      throw new Error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
