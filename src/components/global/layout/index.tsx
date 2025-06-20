import { AppShell } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode; // children prop을 선택적으로 받음
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <AppShell
      navbar={{
        width: 250,
        breakpoint: "sm",
      }}
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Main>
        {/* children이 있으면 children을 렌더링, 없으면 Outlet 사용 */}
        {children || <Outlet />}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
