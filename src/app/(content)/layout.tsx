"use client";
import { Footer } from "@/components/GNB/Footer";
import { AppShell, AppShellFooter, Badge, Box, Burger, Button, Container, Flex, Group, Image, NavLink, Skeleton, Stack, Text } from "@mantine/core";
// import Image from "next/image";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as api from "../api/get/getApi";
import myImage from "/public/images/ACG_LOGO_GRAY.png";
export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const { data, isLoading, isError } = useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });

  const [user, setUser] = useState<any>();

  useEffect(() => {
    data && setUser(data.data.data);
  }, [data]);
  return (
    <AppShell
      header={{
        height: 30,
      }}
      navbar={{ width: 350, breakpoint: "sm", collapsed: { mobile: !mobileOpened, desktop: !desktopOpened } }}
      footer={{
        height: 70,
      }}
      layout="alt"
      // pr={!desktopOpened ? 0 : 300}
    >
      <AppShell.Header withBorder={false}>
        {/* <Header opened={opened} toggle={toggle} /> */}
        <Group h={"100%"} p={"sm"}>
          <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
          <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
        </Group>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Navbar p="md">
        <Group justify="space-between" mb={"lg"}>
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Image component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
          </Group>

          <Button size="xs" variant="light">
            로그아웃
          </Button>
        </Group>
        <Skeleton visible={isLoading}>
          <Flex w={"100%"} bg={"blue.0"} align={"center"} mih={100} columnGap={"xl"} p={"md"} style={{ position: "relative", borderRadius: 7 }}>
            <Flex direction={"column"} rowGap={"md"} w={"100%"}>
              <Box>
                <Text size={"xl"} fw={700} c={"blue.9"}>
                  {user?.userName}
                </Text>
                <Text c={"blue.9"}>
                  <Text c={"blue.9"} component="span" mr={5}>
                    {user?.teamName || user?.hqName}
                  </Text>
                  {user?.gradeName}
                </Text>
              </Box>

              <Group justify="space-between" align="end">
                <Stack gap={"xs"}>
                  <Text c={"blue.9"} size={"xs"}>
                    {user?.userEmail}
                  </Text>

                  <Text c={"blue.9"} size={"xs"}>
                    {user?.userCell}
                  </Text>
                </Stack>
                <Text c={"blue.9"} size={"xs"}>
                  D + 1234
                </Text>
              </Group>
            </Flex>
          </Flex>
        </Skeleton>
        <Group justify="space-between" my={"lg"} px={"sm"}>
          <Group>
            <Text size="sm">업무 경과시간</Text>
            <Text size="sm" styles={{ root: { letterSpacing: 1.2 } }}>
              12:22:00
            </Text>
          </Group>
          <Badge size="lg" color="blue" radius="md">
            정상출근
          </Badge>
        </Group>
        <NavLink label="근태관리" childrenOffset={28}>
          <NavLink label="근태 · 휴가" />
        </NavLink>
        <NavLink label="검사현황" />
        <NavLink component={Link} label="복지" href={"/welfare/meal"}>
          <NavLink component={Link} href={"/welfare/meal"} label="식대" />
          <NavLink component={Link} href={"/welfare/welfarePoint"} label="복지포인트" />
          <NavLink component={Link} href={"/welfare/activity"} label="활동비" />
        </NavLink>
        <NavLink component={Link} href={"/notice"} label="공지사항" />

        <NavLink component={Link} label="내 정보" href={"/myInfo"} />
      </AppShell.Navbar>
      <AppShellFooter withBorder={false}>
        <Container size="xs" style={{ margin: "0 auto", borderTop: "1px solid #e9e9e9" }} h={"100%"}>
          <Footer />
        </Container>
      </AppShellFooter>
    </AppShell>
  );
}
