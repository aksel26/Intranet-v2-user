import { authOptions } from "@/lib/auth/auth";
import NextAuth from "next-auth";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
