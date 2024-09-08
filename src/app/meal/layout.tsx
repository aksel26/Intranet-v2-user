"use client";

import { Footer } from "@/components/GNB/Footer";
import { AppShell, AppShellFooter, Container } from "@mantine/core";
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
      <AppShell.Main pb={0}>{children}</AppShell.Main>
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
