import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Session에 대한 타입 확장
   */
  interface Session {
    user: {
      id: string;
      accessToken: string;
    } & DefaultSession["user"];
  }

  /**
   * User에 대한 타입 확장
   */
  interface User {
    id: string;
    accessToken: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  /**
   * JWT 토큰에 대한 타입 확장
   */
  interface JWT {
    id: string;
    accessToken: string;
  }
}
