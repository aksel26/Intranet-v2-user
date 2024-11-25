import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { GlobalContainer } from "@/components/Global/GlobalContainer";
import { Metadata } from "next";
import Providers from "@/components/Global/config/Provider";
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

const myFont = localFont({
  src: "./static/font/NanumSquareNeo-Variable.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <title>하이</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <ColorSchemeScript />
      </head>
      <body style={{ height: "100vh" }} className={myFont.className}>
        <Providers>
          {/* <StoreProvider> */}
          <GlobalContainer>{children}</GlobalContainer>
          {/* </StoreProvider> */}
        </Providers>
      </body>
    </html>
  );
}
