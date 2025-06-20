// src/store/useAuthStore.ts
import { create } from "zustand";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,

  login: (token: string, user: User) => {
    // sessionStorage에 토큰과 사용자 정보 저장
    sessionStorage.setItem("auth-token", token);
    sessionStorage.setItem("auth-user", JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  logout: () => {
    // sessionStorage에서 토큰과 사용자 정보 제거
    sessionStorage.removeItem("auth-token");
    sessionStorage.removeItem("auth-user");

    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: () => {
    // sessionStorage에서 토큰과 사용자 정보 복원
    const token = sessionStorage.getItem("auth-token");
    const userStr = sessionStorage.getItem("auth-user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        set({
          token,
          user,
          isAuthenticated: true,
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        // 파싱 실패 시 sessionStorage 정리
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-user");
      }
    }
  },
}));
