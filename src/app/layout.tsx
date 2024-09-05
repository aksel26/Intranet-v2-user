import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./globals.css";

import { GlobalContainer } from "@/components/Global/GlobalContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Next.js PWA",
  description: "A Progressive Web App built with Next.js",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  icons: [{ rel: "apple-touch-icon", url: "/icon-192x192.png" }],
};
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
      </head>
      <body style={{ height: "100vh" }}>
        <GlobalContainer>{children}</GlobalContainer>
      </body>
    </html>
  );
}
