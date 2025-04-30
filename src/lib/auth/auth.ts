import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        id: { label: "ID", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.id || !credentials?.password) {
          return null;
        }

        try {
          // 외부 API에 로그인 요청
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            password: credentials.password,
            id: credentials.id,
          });

          if (data.data.accessToken) {
            // Auth.js 사용자 객체에 토큰 포함

            return {
              id: credentials.id,
              ...data.data, // API 응답의 모든 데이터를 포함
            };
          }
          return null;
        } catch (error) {
          console.log("🚀 ~ authorize ~ error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // JWT에 토큰 저장
    async jwt({ token, user }) {
      if (user) {
        // user 객체의 모든 속성을 token에 복사
        token.user = user;
      }
      return token;
    },
    // 세션에 토큰 전달
    async session({ session, token }) {
      session.user = token.user;
      // 기존 accessToken도 유지
      session.accessToken = token.user.accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt", // JWT 기반 세션
    maxAge: 60 * 60 * 24 * 14, // 2주 (14일)
  },
  pages: {
    signIn: "/", // 커스텀 로그인 페이지
    signOut: "/", // 커스텀 로그아웃 페이지
  },
  secret: process.env.NEXTAUTH_SECRET, // .env에 설정
};

export default NextAuth(authOptions);
