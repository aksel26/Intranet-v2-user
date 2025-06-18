import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "./globals.css";

import { GlobalContainer } from "@/components/Global/GlobalContainer";
import { Metadata, Viewport } from "next";
import Providers from "@/components/Global/config/providers";
import { ColorSchemeScript } from "@mantine/core";
// import StoreProvider from "@/components/Global/config/StoreProvider";
// import { GlobalLayout } from "@/components/Global/layout/globalLayout";
import localFont from "next/font/local";
// export const metadata: Metadata = {
//   title: "My Next.js PWA",
//   description: "A Progressive Web App built with Next.js",
//   manifest: "/manifest.json",
//   themeColor: "#000000",
//   viewport: "width=device-width, initial-scale=1",
//   icons: [{ rel: "apple-touch-icon", url: "/icon-192x192.png" }],
// };
import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
// const myFont = localFont({
//   src: "./static/font/NanumSquareNeo-Variable.ttf",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "ACG 인트라넷",
  description: "ACG 인트라넷",
  // viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no", // <-- here
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
  maximumScale: 1, // 확대 방지
  userScalable: false, // 확대/축소 기능 비활성화
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <ColorSchemeScript />
      </head>
      <body
      // className={myFont.className}
      >
        <Providers>
          {/* <StoreProvider> */}
          <GlobalContainer>{children}</GlobalContainer>
          {/* </StoreProvider> */}
        </Providers>
      </body>
    </html>
  );
}
