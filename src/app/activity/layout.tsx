"use client";

import { Footer } from "@/components/GNB/Footer";
import { Anchor, AppShell, AppShellFooter, Button, Center, Container, Flex, Group, Text } from "@mantine/core";
import { IconBowlSpoon } from "@tabler/icons-react";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell
      footer={{
        height: 60,
      }}
    >
      <AppShell.Main>
        <Container size={"xs"} p={0} h={"100vh"} bg="gray.0">
          {children}
        </Container>
      </AppShell.Main>
      <AppShellFooter
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          borderTop: "1px solid var(--mantine-color-gray-3)",
        }}
      >
        <Footer />
      </AppShellFooter>
    </AppShell>
  );
}
