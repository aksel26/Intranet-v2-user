"use client";
import { AppShell, Burger, Group, Image, rem, ScrollArea } from "@mantine/core";
// import Image from "next/image";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React, { memo } from "react";
import myImage from "/public/images/ACG_LOGO_GRAY.png";

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
  const pinned = useHeadroom({ fixedAt: 60 });
  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleMobile = useNavStore((state) => state.toggleMobile);

  const router = useRouter();

  const clickLogo = () => {
    toggleMobile();
    router.push("/main");
  };

  return (
    <AppShell
      header={{
        height: 50,
        collapsed: !pinned,
        offset: false,
      }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      layout="alt"
    >
      <AppShell.Header withBorder={false}>
        <Group h={"100%"} px={"sm"}>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Main styles={{ main: { background: "oklch(0.985 0.002 247.839)", overflowY: "auto" } }} h={"calc(100vh - 50px)"}>
        {children}
      </AppShell.Main>
      <AppShell.Navbar p="md" withBorder={false} zIndex={199}>
        <AppShell.Section>
          <Group justify="space-between">
            <Group>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Image onClick={clickLogo} component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
            </Group>

            <LogoutButton />
          </Group>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <MemoizedUserInfoCard />
          <AttendanceInfo />
          <MemoizedNavMenu />
        </AppShell.Section>
      </AppShell.Navbar>
    </AppShell>
  );
}
