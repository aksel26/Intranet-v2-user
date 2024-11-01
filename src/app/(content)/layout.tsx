"use client";
import { Footer } from "@/components/GNB/Footer";
import { AppShell, AppShellFooter, Button, Container, Flex, Group, Image } from "@mantine/core";
// import Image from "next/image";
import React from "react";
import NextImage from "next/image";
import myImage from "../../../public/images/ACG_LOGO_GRAY.png";
import Header from "@/components/GNB/Header";

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
        <Header />
      </AppShell.Header>
      <AppShell.Main>
        <Container size={"xs"}>{children}</Container>
      </AppShell.Main>
      <AppShellFooter withBorder={false}>
        <Container size="xs" style={{ margin: "0 auto", borderTop: "1px solid #e9e9e9" }} h={"100%"}>
          <Footer />
        </Container>
      </AppShellFooter>
    </AppShell>
  );
}
