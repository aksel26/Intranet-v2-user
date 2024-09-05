"use client";

import { AppShell, AppShellFooter, MantineProvider, MantineTheme, createTheme } from "@mantine/core";

import "./globals.css";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/splashScreen/SplashScreen";
const theme = createTheme({
  fontFamily: "var(--font-pretendard)",
  primaryColor: "blue",
  colors: {
    blue: ["#eff8fe", "#ebf6ff", "#d5eafa", "#a6d4f7", "#74bdf6", "#52a9f5", "#3f9cf5", "#3697f6", "#2a83db", "#1e74c4", "#0064ad"],
    // You can add more custom colors here
  },
  cursorType: "pointer",
  defaultRadius: "md",
  components: {
    Paper: {
      styles: (theme: MantineTheme) => ({
        root: {
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: theme.shadows.md,
          },
          "&:active": {
            transform: "translateY(0)",
            boxShadow: theme.shadows.sm,
          },
        },
      }),
    },
    Box: {
      defaultProps: {
        style: { borderRadius: "8px" },
      },
    },
    Grid: {
      defaultProps: {
        style: { borderRadius: "8px" },
      },
    },
    Flex: {
      defaultProps: {
        style: { borderRadius: "8px" },
      },
    },
    GridCol: {
      // Grid.Col은 실제로 GridCol 컴포넌트입니다
      defaultProps: {
        style: { borderRadius: "8px" },
      },
    },
    AppShell: AppShell.extend({
      styles: () => ({
        main: {
          // paddingBottom: "120px", // 네비게이션 바 높이만큼 패딩 추가
          // height: "calc(100vh - 60px)",
          overflowY: "auto",
          // scrollPaddingBottom: "60px",
        },
      }),
    }),
  },

  /** Put your other mantine theme overrides here */
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 여기에 초기 로딩 로직을 추가할 수 있습니다.
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="ko">
      <head>
        <title>하이</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body style={{ height: "100vh" }}>
        <MantineProvider theme={theme}>
          <Notifications />
          {children}
          {/* {isLoading ? <SplashScreen /> : children} */}
        </MantineProvider>
      </body>
    </html>
  );
}
