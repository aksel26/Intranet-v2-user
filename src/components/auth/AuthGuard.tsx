// src/components/AuthGuard.tsx
import { useEffect } from "react";
// import { useAuthStore } from "../store/useAuthStore";
import { useAuthStore } from "@/store/useAuthStore";
import { LoadingOverlay } from "@mantine/core";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { initializeAuth, isInitialized } = useAuthStore();

  useEffect(() => {
    // 앱 시작 시 sessionStorage에서 인증 정보 복원
    if (!isInitialized) {
      initializeAuth();
    }
  }, [initializeAuth, isInitialized]);

  // 초기화가 완료되지 않은 경우 로딩 표시
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
      </div>
    );
  }

  return <>{children}</>;
};
