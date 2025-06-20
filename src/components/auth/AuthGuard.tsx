// src/components/AuthGuard.tsx
import { useEffect, useState } from "react";

import { LoadingOverlay } from "@mantine/core";
import { useAuthStore } from "../../store/useAuthStore";

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { initializeAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // sessionStorage에서 인증 정보 복원
    initializeAuth();
    setIsLoading(false);
  }, [initializeAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingOverlay visible />
      </div>
    );
  }

  return <>{children}</>;
};
