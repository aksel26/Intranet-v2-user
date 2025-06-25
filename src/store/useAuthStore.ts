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
  isInitialized: boolean; // 초기화 상태 추가
  login: (token: string, user: User) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false, // 초기값 false

  login: (token: string, user: User) => {
    // sessionStorage에 토큰과 사용자 정보 저장
    sessionStorage.setItem("auth-token", token);
    sessionStorage.setItem("auth-user", JSON.stringify(user));

    set({
      token,
      user,
      isAuthenticated: true,
      isInitialized: true,
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
      isInitialized: true, // 로그아웃해도 초기화는 완료됨
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
          isInitialized: true,
        });
      } catch (error) {
        console.error("Failed to parse user data:", error);
        // 파싱 실패 시 sessionStorage 정리
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("auth-user");
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      }
    } else {
      // 토큰이 없는 경우도 초기화 완료로 표시
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },
}));
