"use client";

import { Button, Container, Flex, Image } from "@mantine/core";
import React from "react";
import NextImage from "next/image";
import myImage from "../../../public/images/ACG_LOGO_GRAY.png";
import useLogout from "@/hooks/useLogout";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export default function Header() {
  const { mutate: logout, isError, isSuccess } = useLogout();

  const router = useRouter();
  const handleLogout = async () => {
    logout(undefined, {
      onError: () => {
        notifications.show({
          title: "로그아웃 오류",
          message: "로그아웃을 실패하였습니다",
          position: "top-center",
          color: "red",
        });
      },
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <Container size="xs" style={{ margin: "0 auto" }} h={"100%"}>
      <Flex align={"center"} py={"md"} justify={"space-between"} px={"md"}>
        <Image component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} />
        <Button size="xs" variant="subtle" onClick={handleLogout}>
          로그아웃
        </Button>
      </Flex>
    </Container>
  );
}
