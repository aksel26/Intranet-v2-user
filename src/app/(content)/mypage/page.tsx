"use client";

import { Box, Divider, Flex, Group, Image, NavLink, Skeleton, Text } from "@mantine/core";
import { IconChevronRight, IconClover2, IconInfoSquareRounded, IconList, IconQrcode } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import myImage from "../../../../public/images/ACG_LOGO.png";
import * as api from "../../api/get/getApi";
import { usePathname, useRouter } from "next/navigation";
const Main = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });

  const [user, setUser] = useState<any>();

  useEffect(() => {
    data && setUser(data.data.data);
  }, [data]);

  const router = useRouter();
  const pathName = usePathname();

  const moveLottery = () => {
    router.push(`${pathName}/lottery`);
  };
  const moveLunchGroup = () => {
    router.push(`${pathName}/lunch-group`);
  };

  return (
    <>
      <Flex direction={"column"} rowGap={"xl"} pt={"lg"} p={"sm"}>
        <Text size="xl" fw={700}>
          더보기
        </Text>

        <Skeleton visible={isLoading} h={130}>
          <Flex bg={"#005b99"} align={"center"} mih={100} columnGap={"xl"} p={"md"} style={{ position: "relative", borderRadius: 7 }}>
            <Image component={NextImage} src={myImage} alt="CI" w={"auto"} h={"1rem"} style={{ position: "absolute", right: 20, top: 20 }} />
            <Flex direction={"column"} rowGap={"md"}>
              <Box>
                <Text size={"xl"} fw={700} c={"white"}>
                  {user?.userName}
                </Text>
                <Text c={"white"}>{user?.gradeName}</Text>
              </Box>

              <Group gap={"xs"}>
                <Text c={"white"} size={"xs"}>
                  {user?.teamName || user?.hqName}
                </Text>
                <Divider orientation="vertical" />

                <Text c={"white"} size={"xs"}>
                  {user?.userEmail}
                </Text>

                <Divider orientation="vertical" />

                <Text c={"white"} size={"xs"}>
                  {user?.userCell}
                </Text>
              </Group>
            </Flex>
          </Flex>
        </Skeleton>
        <Flex direction={"column"} rowGap={"xs"}>
          <NavLink href="#required-for-focus" label="점심조" leftSection={<IconClover2 size="1.5rem" stroke={1.1} />} childrenOffset={28}>
            <NavLink label="점심 조 뽑기" onClick={moveLottery} />
            <NavLink label="현황보기" onClick={moveLunchGroup} />
          </NavLink>

          <Link href={"/mypage/list"} passHref legacyBehavior>
            <NavLink
              href="#required-for-focus"
              label="문의하기"
              leftSection={<IconInfoSquareRounded size="1.5rem" stroke={1.1} />}
              rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
            />
          </Link>
        </Flex>
      </Flex>
    </>
  );
};

export default Main;
