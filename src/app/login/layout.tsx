"use client";
import { AppShell, Center, Container } from "@mantine/core";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <AppShell.Main>
        <Container h={"100svh"} size={"xs"}>
          <Center h={"100%"}>{children}</Center>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
