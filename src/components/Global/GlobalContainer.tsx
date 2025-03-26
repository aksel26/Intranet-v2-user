"use client";

import { theme } from "@/lib/theme";
import { createTheme, MantineProvider, rem } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import React from "react";
export const GlobalContainer = ({ children }: { children: React.ReactNode }) => {
  //   const [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     // 여기에 초기 로딩 로직을 추가할 수 있습니다.
  //     const timer = setTimeout(() => setIsLoading(false), 2000);
  //     return () => clearTimeout(timer);
  //   }, []);

  const theme = createTheme({
    defaultRadius: "md",
    // primaryColor: "indigo",
    colors: {
      primary: ["#e0fbff", "#cff1fd", "#a4dff4", "#76ccec", "#4fbce5", "#36b2e1", "#21aee1", "#0498c8", "#0087b4", "#0075a0"],
    },

    primaryColor: "primary",

    fontFamily: "NanumSquareNeoVariable, sans-serif",
    // fontSizes: {
    //   xs: rem(10),
    //   sm: rem(11),
    //   md: rem(14),
    //   lg: rem(16),
    //   xl: rem(20),
    // },
    components: {
      Button: {
        styles: {
          label: {
            fontWeight: 500,
          },
        },
      },
    },
  });
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      {children}
    </MantineProvider>
  );
};
