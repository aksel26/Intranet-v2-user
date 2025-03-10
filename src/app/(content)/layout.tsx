"use client";
import { AppShell, Box, Burger, Button, Flex, Group, Image, NavLink, rem, Skeleton, Stack, Text } from "@mantine/core";
// import Image from "next/image";
import useGetMe from "@/hooks/useGetMe";
import useLogout from "@/hooks/useLogout";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import myImage from "/public/images/ACG_LOGO_GRAY.png";

import CheckOutWrapper from "@/components/Attendance/CheckOutWrapper";
import AttendanceButtonWrapper from "@/components/Navbar/AttendanceButtonWrapper";
import Vacation from "@/components/Navbar/attendanceSummary/Vacation";
import Work from "@/components/Navbar/attendanceSummary/Work";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const CheckIn = React.lazy(() => import("@/components/Attendance/CheckIn"));

dayjs.locale("ko");

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const pinned = useHeadroom({ fixedAt: 60 });
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { myInfo, isLoading, isError } = useGetMe();
  console.log("🚀 ~ ContentLayout ~ myInfo:", myInfo);

  const { mutate: logout, isError: isError_logout, isSuccess: isSuccess_logout } = useLogout();
  const [onWorkTimeOpened, { open: onWorkModalOpen, close: onWorkModalClose }] = useDisclosure(false);
  const [offWorkTimeOpened, { open: offWorkModalOpen, close: offWorkModalClose }] = useDisclosure(false);

  const [dday, setDday] = useState<any>();
  console.log("🚀 ~ ContentLayout ~ dday:", dday);

  const getDDayCount = useCallback((baseDate: string | null) => {
    const today = dayjs();
    const target = dayjs(baseDate);
    const diff = today.diff(target, "day");

    return diff >= 0 ? `ACG Day + ${diff}` : `-`;
  }, []);

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

  const clickLogo = () => router.push("/main");

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
      <AppShell.Main styles={{ main: { background: "#f2f2f2" } }} pt={`calc(${rem(50)}`}>
        {children}
      </AppShell.Main>
      <AppShell.Navbar p="md" withBorder={false}>
        <Group justify="space-between" mb={"lg"}>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Image onClick={clickLogo} component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
          </Group>

          <Button size="xs" variant="light" onClick={handleLogout}>
            로그아웃
          </Button>
        </Group>
        <Skeleton visible={isLoading}>
          <Stack w={"100%"} bg={"blue.0"} align={"center"} mih={100} p={"md"}>
            <Flex direction={"column"} w={"100%"} columnGap={"xl"} style={{ position: "relative", borderRadius: 7 }}>
              <Flex direction={"column"} rowGap={"md"} w={"100%"}>
                <Box>
                  <Text fz={"lg"} fw={600} c={"blue.9"}>
                    {myInfo?.userName}
                    <Text fz={"sm"} c={"blue.9"} component="span" ml={5}>
                      {myInfo?.gradeName}
                    </Text>
                  </Text>
                  <Group gap={"xs"} mt={3}>
                    <Text fz={"sm"} c={"blue.9"} component="span">
                      {myInfo?.hqName}
                    </Text>
                    <Text fz={"sm"} c={"blue.9"} component="span">
                      {myInfo?.teamName || ""}
                    </Text>
                  </Group>
                </Box>

                <Group justify="space-between" align="end">
                  <Text c={"blue.9"} size={"xs"}>
                    {myInfo?.userEmail}
                  </Text>
                  <Text c={"blue.9"} size={"xs"}>
                    {getDDayCount(myInfo?.joinDate)}
                  </Text>
                </Group>
              </Flex>
            </Flex>
          </Stack>
        </Skeleton>

        {myInfo?.attendance === "연차" ? <Vacation /> : <Work myInfo={myInfo} />}
        <AttendanceButtonWrapper onWorkModalOpen={onWorkModalOpen} offWorkModalOpen={offWorkModalOpen} />
        <NavLink label="근태" childrenOffset={28}>
          <NavLink component={Link} href={"/attendance/work"} label="출퇴근 관리" />
          <NavLink component={Link} href={"/attendance/vacation"} label="휴가/연차 관리" />
        </NavLink>
        <NavLink label="검사현황" />
        <NavLink label="복지" childrenOffset={28}>
          <NavLink component={Link} href={"/welfare/meal"} label="식대" />
          <NavLink component={Link} href={"/welfare/welfarePoint"} label="복지포인트" />
          <NavLink component={Link} href={"/welfare/activity"} label="활동비" />
        </NavLink>
        <NavLink component={Link} href={"#"} label="결재/승인" />
        <NavLink component={Link} href={"/notice"} label="공지사항" />
        <NavLink label="기타 메뉴">
          <NavLink component={Link} href={"/survey"} label="설문/리뷰" />
          <NavLink component={Link} href={"/myInfo"} label="내 정보 수정" />
        </NavLink>
      </AppShell.Navbar>

      <CheckIn myInfo={myInfo} onWorkModalClose={onWorkModalClose} onWorkTimeOpened={onWorkTimeOpened} />
      <CheckOutWrapper myInfo={myInfo} offWorkModalClose={offWorkModalClose} offWorkTimeOpened={offWorkTimeOpened} />
    </AppShell>
  );
}
