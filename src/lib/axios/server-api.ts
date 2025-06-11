import axios, { AxiosError } from "axios";
import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { authOptions } from "../auth/auth";

// 서버 컴포넌트용 API 클라이언트 생성 함수
export async function createServerApiClient() {
  const session = await getServerSession(authOptions);
  console.log("session:", session);

  const serverApiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(session?.accessToken && {
        Authorization: `Bearer ${session.accessToken}`,
      }),
    },
  });

  // 서버 사이드 응답 인터셉터
  serverApiClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // 서버 컴포넌트에서는 redirect 사용
        redirect("/");
      }
      return Promise.reject(error);
    }
  );

  return serverApiClient;
}
