"use client";
import { Anchor, AppShell, Box, Burger, Button, Group, Image, Popover, ScrollArea, Stack, Text } from "@mantine/core";
// import Image from "next/image";
import NextImage from "next/image";
import React, { memo, useEffect } from "react";
import myImage from "/public/images/ACG_LOGO_GRAY.png";

import AttendanceInfo from "@/components/Navbar/attendanceInfo";
import LogoutButton from "@/components/Navbar/logout";
import NavMenu from "@/components/Navbar/menu";
import UserInfoCard from "@/components/Navbar/userInfoCard";
import { BOOKMARKS } from "@/lib/bookmark";
import { useNavStore } from "@/lib/store/toggleStore";
import { IconBookmarkFilled, IconExternalLink } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Link from "next/link";
import { ADMIN_URL } from "@/lib/enums";

dayjs.locale("ko");

const MemoizedUserInfoCard = memo(UserInfoCard);
const MemoizedNavMenu = memo(NavMenu);

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleMobile = useNavStore((state) => state.toggleMobile);
  const setMobileClose = useNavStore((state) => state.setMobileClose);

  useEffect(() => {
    if (mobileOpened) {
      document.body.classList.add("navbar-open");
    } else {
      document.body.classList.remove("navbar-open");
    }

    // cleanup
    return () => {
      document.body.classList.remove("navbar-open");
    };
  }, [mobileOpened]);

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
        <Group justify="space-between" align="center" h={"100%"} px="md" wrap="nowrap">
          <Group>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Link href={"/main"} onClick={() => setMobileClose()} style={{ textDecoration: "none" }}>
              <Image component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
            </Link>
          </Group>
          <Group>
            <Button gradient={{ from: "teal", to: "blue", deg: 233 }} size="xs" leftSection={<IconExternalLink size={16} />} variant="gradient" onClick={() => window.open(ADMIN_URL, "_blank")}>
              Admin
            </Button>
            <Popover width={200} position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button visibleFrom="md" size="sm" variant="subtle" leftSection={<IconBookmarkFilled size={15} color="#f7c401" />}>
                  북마크
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <ScrollArea h={200}>
                  <Stack gap={"sm"}>
                    {BOOKMARKS.map((bookmark) => (
                      <Anchor underline="hover" size="xs" href={bookmark.value} target="_blank" key={bookmark.value}>
                        {bookmark.label}
                      </Anchor>
                    ))}
                  </Stack>
                </ScrollArea>
              </Popover.Dropdown>
            </Popover>
          </Group>
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
