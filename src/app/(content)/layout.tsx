"use client";
import { AppShell, Box, Burger, Button, Flex, Group, Image, Modal, NavLink, rem, Skeleton, Stack, Text } from "@mantine/core";
// import Image from "next/image";
import useGetMe from "@/hooks/useGetMe";
import useLogout from "@/hooks/useLogout";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import myImage from "/public/images/ACG_LOGO_GRAY.png";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const pinned = useHeadroom({ fixedAt: 60 });
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const { myInfo, isLoading, isError } = useGetMe();

  const { mutate: logout, isError: isError_logout, isSuccess: isSuccess_logout } = useLogout();
  const [onWorkTimeOpened, { open: onWorkModalOpen, close: onWorkModalClose }] = useDisclosure(false);
  const [offWorkTimeOpened, { open: offWorkModalOpen, close: offWorkModalClose }] = useDisclosure(false);

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
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      layout="alt"
      // pr={!desktopOpened ? 0 : 300}
    >
      <AppShell.Header withBorder={false}>
        {/* <Header opened={opened} toggle={toggle} /> */}
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
          <Flex w={"100%"} bg={"blue.0"} align={"center"} mih={100} columnGap={"xl"} p={"md"} style={{ position: "relative", borderRadius: 7 }}>
            <Flex direction={"column"} rowGap={"md"} w={"100%"}>
              <Box>
                <Text fz={"lg"} fw={700} c={"blue.9"}>
                  {myInfo?.userName}
                </Text>
                <Text c={"blue.9"} fz={"sm"}>
                  <Text fz={"sm"} c={"blue.9"} component="span" mr={5}>
                    {myInfo?.teamName || myInfo?.hqName}
                  </Text>
                  {myInfo?.gradeName}
                </Text>
              </Box>

              <Group justify="space-between" align="end">
                <Stack gap={"xs"}>
                  <Text c={"blue.9"} size={"xs"}>
                    {myInfo?.userEmail}
                  </Text>

                  <Text c={"blue.9"} size={"xs"}>
                    {myInfo?.userCell}
                  </Text>
                </Stack>
                <Text c={"blue.9"} size={"xs"}>
                  D + 1234
                </Text>
              </Group>
            </Flex>
          </Flex>
        </Skeleton>

        <Group wrap="nowrap" my="sm">
          <Button fullWidth variant="filled" onClick={onWorkModalOpen}>
            출근하기
          </Button>
          <Button fullWidth variant="filled" onClick={offWorkModalOpen}>
            퇴근하기
          </Button>
        </Group>
        <NavLink label="근태 · 휴가 관리" childrenOffset={28}>
          <NavLink component={Link} href={"/attendance"} label="Dashboard" />
          <NavLink component={Link} href={"/attendance/vacation"} label="휴가 관리" />
          <NavLink component={Link} href={"/attendance/work"} label="근태 관리" />
        </NavLink>
        <NavLink label="검사현황" />
        <NavLink label="복지" childrenOffset={28}>
          <NavLink component={Link} href={"/welfare/meal"} label="식대" />
          <NavLink component={Link} href={"/welfare/welfarePoint"} label="복지포인트" />
          <NavLink component={Link} href={"/welfare/activity"} label="활동비" />
        </NavLink>
        <NavLink component={Link} href={"/notice"} label="공지사항" />

        <NavLink label="기타 메뉴">
          <NavLink component={Link} href={"/survey"} label="설문/리뷰" />
          <NavLink component={Link} href={"/myInfo"} label="내 정보 수정" />
        </NavLink>
      </AppShell.Navbar>
      {/* <AppShellFooter withBorder={false}>
        <Container size="xs" style={{ margin: "0 auto", borderTop: "1px solid #e9e9e9" }} h={"100%"}>

          <Center>ACG</Center>
        </Container>
      </AppShellFooter> */}
      <Modal opened={onWorkTimeOpened} onClose={onWorkModalClose} title="출근하기" centered size={"xs"}>
        <Text>
          {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>님,
        </Text>
        <Text>반갑습니다. 👋 </Text>
        <Text c={"dimmed"} fz={"sm"} mt={"md"}>
          아래 버튼을 눌러 출근을 완료해 주세요.
        </Text>
        <Group wrap="nowrap" mt={"md"}>
          <Button fullWidth>출근하기</Button>
          <Button fullWidth variant="light" color="gray.8" onClick={onWorkModalClose}>
            닫기
          </Button>
        </Group>
      </Modal>
      <Modal opened={offWorkTimeOpened} onClose={offWorkModalClose} title="퇴근하기" centered size={"xs"}>
        <Text>
          {myInfo?.userName} <Text component="span">{myInfo?.gradeName}</Text>님,
        </Text>
        <Text>오늘도 수고하셨습니다. 🎉 </Text>
        <Text c={"dimmed"} fz={"sm"} mt={"md"}>
          아래 버튼을 눌러 퇴근을 완료해 주세요.
        </Text>
        <Group wrap="nowrap" mt={"md"}>
          <Button fullWidth>퇴근하기</Button>
          <Button fullWidth variant="light" color="gray.8" onClick={offWorkModalClose}>
            닫기
          </Button>
        </Group>
      </Modal>
    </AppShell>
  );
}
