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
        console.log("🚀 ~ authorize ~ credentials:", credentials);
        if (!credentials?.id || !credentials?.password) {
          return null;
        }

        console.log("🚀 ~ authorize ~ credentials:", credentials);

        try {
          // 외부 API에 로그인 요청
          const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
            password: credentials.password,
            id: credentials.id,
          });
          console.log("🚀 ~ authorize ~ data:", data);

          if (data.data.accessToken) {
            // Auth.js 사용자 객체에 토큰 포함
            return {
              id: credentials.id,
              accessToken: data.data.accessToken,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // JWT에 토큰 저장
    async jwt({ token, user }) {
      console.log("🚀 ~ jwt ~ token, user:", token, user);
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // 세션에 토큰 전달
    async session({ session, token }) {
      console.log("🚀 ~ session ~ session, token:", session, token);
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt", // JWT 기반 세션
    maxAge: 60 * 60, // 세션 1시간
  },
  pages: {
    signIn: "/", // 커스텀 로그인 페이지
  },
  secret: process.env.NEXTAUTH_SECRET, // .env에 설정
};

export default NextAuth(authOptions);
