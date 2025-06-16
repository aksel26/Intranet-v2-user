"use client";
import { AppShell, Box, Burger, Group, Image, ScrollArea, Text } from "@mantine/core";
// import Image from "next/image";
import { useHeadroom } from "@mantine/hooks";
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
  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleMobile = useNavStore((state) => state.toggleMobile);
  const setMobileClose = useNavStore((state) => state.setMobileClose);

  const router = useRouter();

  const clickLogo = () => {
    setMobileClose();
    router.push("/main");
  };

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
        <Group h={"100%"} px="md">
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Image onClick={clickLogo} component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
        </Group>
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

      <AppShell.Main
      // h={"100dvh"}
      >
        <Box
        // style={{
        //   paddingBottom: "calc(50px + var(--mantine-spacing-sm))",
        // }}
        >
          {children}
        </Box>
      </AppShell.Main>
      <AppShell.Footer withBorder={false}>
        <Group align="center" h={"100%"} justify="center">
          <Text fz={"xs"}>© {dayjs().year()} ACG</Text>
        </Group>
      </AppShell.Footer>
    </AppShell>
  );
}
