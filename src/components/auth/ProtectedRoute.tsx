// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

import { LoadingOverlay } from "@mantine/core";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isInitialized } = useAuthStore();

  // 아직 초기화가 완료되지 않은 경우 로딩 표시
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />
      </div>
    );
  }

  // 초기화 완료 후 인증되지 않은 경우 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
