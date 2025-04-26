"use client";
import { AppShell, Burger, Button, Group, Image, rem } from "@mantine/core";
// import Image from "next/image";
import useGetMe from "@/hooks/useGetMe";
import useLogout from "@/hooks/useLogout";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import NextImage from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import myImage from "/public/images/ACG_LOGO_GRAY.png";

import CheckOutWrapper from "@/components/Attendance/CheckOutWrapper";
import Vacation from "@/components/Navbar/attendanceInfo/Vacation";
import Work from "@/components/Navbar/attendanceInfo/Work";
import NavMenu from "@/components/Navbar/menu";
import UserInfoCard from "@/components/Navbar/userInfoCard";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useNavStore } from "@/lib/store/toggleStore";
import { useGetQuery } from "@/lib/api/queryHooks";
import AttendanceInfo from "@/components/Navbar/attendanceInfo";

const CheckIn = React.lazy(() => import("@/components/Attendance/CheckIn"));

dayjs.locale("ko");

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pinned = useHeadroom({ fixedAt: 60 });
  // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleMobile = useNavStore((state) => state.toggleMobile);

  // const { myInfo, isLoading, isError } = useGetMe();

  // const { data, isLoading, error } = useGetQuery("me", "/users/me");
  // console.log("data: ", data);

  const {
    mutate: logout,
    isError: isError_logout,
    isSuccess: isSuccess_logout,
  } = useLogout();

  const router = useRouter();
  const handleLogout = async () => {
    logout(undefined, {
      onError: () => {
        notifications.show({
          title: "로그아웃",
          message: "로그아웃을 실패하였습니다",
          position: "top-center",
          color: "red",
        });
      },
      onSuccess: () => {
        notifications.show({
          title: "로그아웃",
          message: "로그아웃되었습니다. 다시 로그인해 주세요.",
          position: "top-center",
          color: "green",
        });
        router.push("/");
      },
    });
  };

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
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Main
        styles={{ main: { background: "oklch(0.985 0.002 247.839)" } }}
        pt={`calc(${rem(50)}`}
      >
        {children}
      </AppShell.Main>
      <AppShell.Navbar p="md" withBorder={false}>
        <Group justify="space-between" mb={"lg"}>
          <Group>
            <Burger
              opened={mobileOpened}
              onClick={toggleMobile}
              hiddenFrom="sm"
              size="sm"
            />
            <Image
              onClick={clickLogo}
              component={NextImage}
              src={myImage}
              alt="My image"
              fit="contain"
              h={20}
              w={80}
              style={{ cursor: "pointer" }}
            />
          </Group>

          <Button size="xs" variant="light" onClick={handleLogout}>
            로그아웃
          </Button>
        </Group>

        <UserInfoCard />

        <AttendanceInfo />
        <NavMenu />
      </AppShell.Navbar>
    </AppShell>
  );
}
