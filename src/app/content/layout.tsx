"use client";
import { Footer } from "@/components/GNB/Footer";
import { AppShell, AppShellFooter, Button, Container, Flex, Group, Image } from "@mantine/core";
// import Image from "next/image";
import React from "react";
import NextImage from "next/image";
import myImage from "../../../public/images/ACG_LOGO_GRAY.png";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      header={{
        height: 55,
      }}
      footer={{
        height: 70,
      }}
    >
      <AppShell.Header withBorder={false}>
        {/* <Image src={"/public/images/ACG_LOGO.png"} height={60} width={200} alt="logo" /> */}
        <Flex align={"center"} h={"100%"} p={"md"} justify={"space-between"} px={"xl"}>
          <Image component={NextImage} src={myImage} alt="My image" fit="contain" h={20} w={80} />
          <Button size="xs" variant="subtle">
            로그아웃
          </Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <Container size={"xs"}>{children}</Container>
      </AppShell.Main>
      <AppShellFooter>
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
