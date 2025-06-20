import { BOOKMARKS } from "@/lib/bookmark";
import { useNavStore } from "@/lib/store/toggleStore";
import { Anchor, Burger, Button, Group, Image, Popover, ScrollArea, Stack } from "@mantine/core";
import { IconBookmarkFilled, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import React, { useEffect } from "react";
import NextImage from "next/image";
import myImage from "/public/images/ACG_LOGO_GRAY.png";
import { ADMIN_URL } from "@/lib/enums";
import { myInfoStore } from "@/lib/store/myInfoStore";
const Header = () => {
  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleMobile = useNavStore((state) => state.toggleMobile);
  const setMobileClose = useNavStore((state) => state.setMobileClose);
  const { myInfo } = myInfoStore();
  console.log("myInfo:", myInfo);
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
    <Group justify="space-between" align="center" h={"100%"} px="md" wrap="nowrap">
      <Group>
        <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
        <Link href={"/main"} onClick={() => setMobileClose()} style={{ textDecoration: "none" }}>
          <Image component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} style={{ cursor: "pointer" }} />
        </Link>
      </Group>
      <Group>
        <Button
          hidden={myInfo?.hqName !== "P&C"}
          gradient={{ from: "teal", to: "blue", deg: 233 }}
          size="xs"
          leftSection={<IconExternalLink size={16} />}
          variant="gradient"
          onClick={() => window.open(ADMIN_URL, "_blank")}
        >
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
  );
};

export default Header;
