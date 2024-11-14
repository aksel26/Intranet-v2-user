"use client";

import { Box, Container, Divider, Flex, Group, Image, NavLink, Skeleton, Text } from "@mantine/core";
import { IconChevronRight, IconClover2, IconInfoSquareRounded, IconList, IconQrcode } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import NextImage from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import myImage from "/public/images/ACG_LOGO.png";
import * as api from "@/app/api/get/getApi";
import { usePathname, useRouter } from "next/navigation";
import User from "/public/icons/user.svg";
const Main = () => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["me"], queryFn: () => api.getMe() });

  const [user, setUser] = useState<any>();

  useEffect(() => {
    data && setUser(data.data.data);
  }, [data]);

  const router = useRouter();
  const pathName = usePathname();

  return (
    <Container size={"xs"} p={0} bg="gray.0" style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
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
          <NavLink label="점심조" leftSection={<IconClover2 size="1.5rem" stroke={1.1} />} childrenOffset={28}>
            <NavLink component={Link} label="점심 조 뽑기" href={`${pathName}/lottery`} />
            <NavLink component={Link} label="현황보기" href={`${pathName}/lunch-group`} />
          </NavLink>
          <NavLink
            component={Link}
            label="문의하기"
            href={`${pathName}/list`}
            leftSection={<IconInfoSquareRounded size="1.5rem" stroke={1.1} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Main;
