import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: any; // 실제 user 타입으로 변경
    accessToken: string;
  }

  interface User {
    accessToken: string;
    // 다른 user 속성들 추가
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: any; // 실제 user 타입으로 변경
  }
}
