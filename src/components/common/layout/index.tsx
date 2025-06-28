import { AppShell, ScrollArea } from "@mantine/core";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import NavMenu from "./nav/menu";
import LogoutButton from "./nav/logout";

import Footer from "./footer";
import AttendanceInfo from "./nav/attendance";
import UserInfoCard from "./nav/userInfo";
import { useNavStore } from "@/store/navStore";
import { useQueryClient } from "@tanstack/react-query";
import { myInfoStore } from "@/store/myInfoStore";

interface LayoutProps {
  children?: React.ReactNode; // children prop을 선택적으로 받음
}
const Layout = ({ children }: LayoutProps) => {
  const mobileOpened = useNavStore((state) => state.mobileOpened);

  const { myInfo } = myInfoStore();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!myInfo?.userIdx) return;

    queryClient.invalidateQueries({
      queryKey: ["me", { userIdx: myInfo?.userIdx }],
    });
    queryClient.invalidateQueries({
      predicate: (query) => {
        const queryKey = query.queryKey;
        const targetKeys = [
          "workHours",
          "vacationSummary",
          "vacationAll",
          "notices",
          "attendanceAllStaff",
          "noticeNew",
          "approvalNew",
        ];
        return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
      },
    });
  }, [myInfo?.userIdx]);

  return (
    <AppShell
      header={{ height: 50 }}
      footer={{ height: 40 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened },
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar p="md" withBorder={false}>
        <AppShell.Section>
          <UserInfoCard />
          <AttendanceInfo />
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <NavMenu />
        </AppShell.Section>
        <AppShell.Section>
          <LogoutButton />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        {/* children이 있으면 children을 렌더링, 없으면 Outlet 사용 */}
        {children || <Outlet />}
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
