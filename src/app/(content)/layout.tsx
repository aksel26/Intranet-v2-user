"use client";
import { AppShell, Box, Group, ScrollArea, Text } from "@mantine/core";
// import Image from "next/image";
import React, { memo } from "react";

import Header from "@/components/GNB/Header";
import AttendanceInfo from "@/components/Navbar/attendanceInfo";
import LogoutButton from "@/components/Navbar/logout";
import NavMenu from "@/components/Navbar/menu";
import UserInfoCard from "@/components/Navbar/userInfoCard";
import { useNavStore } from "@/lib/store/toggleStore";
import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

const MemoizedUserInfoCard = memo(UserInfoCard);
const MemoizedNavMenu = memo(NavMenu);

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const mobileOpened = useNavStore((state) => state.mobileOpened);

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
          <MemoizedUserInfoCard />
          <AttendanceInfo />
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <MemoizedNavMenu />
        </AppShell.Section>
        <AppShell.Section>
          <LogoutButton />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box pb={{ base: "calc(50px + var(--mantine-spacing-sm))", md: 0 }}>{children}</Box>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group align="center" h={"100%"} justify="center">
          <Text fz={"xs"}>© {dayjs().year()} ACG</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
