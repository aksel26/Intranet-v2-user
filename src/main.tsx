import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  defaultRadius: "md",
  // primaryColor: "indigo",
  colors: {
    primary: [
      "#e0fbff",
      "#cff1fd",
      "#a4dff4",
      "#76ccec",
      "#4fbce5",
      "#36b2e1",
      "#21aee1",
      "#0498c8",
      "#0087b4",
      "#0075a0",
    ],
  },
  cursorType: "pointer",

  primaryColor: "primary",

  fontFamily: "Pretendard, sans-serif", // 기본 폰트를 Pretendard로 설정

  headings: {
    // properties for all headings
    fontWeight: "400",
    fontFamily: "Roboto",

    // properties for individual headings, all of them are optional
    sizes: {
      h1: {
        fontWeight: "900",
      },
      h2: { fontWeight: "800" },
      h3: { fontWeight: "700" },
      h4: { fontWeight: "600" },
      h5: { fontWeight: "500" },
      h6: { fontWeight: "400" },
    },
  },
  components: {
    Button: {
      styles: {
        label: {
          fontWeight: 500,
        },
      },
    },
    Checkbox: {
      defaultProps: {
        radius: "sm", // 여기에 원하는 radius 값 설정 ('xs', 'sm', 'md', 'lg', 'xl' 또는 숫자)
      },
    },
    Indicator: {
      styles: {
        root: {
          zIndex: 1,
        },
      },
    },
    Badge: {
      styles: {
        label: {
          fontWeight: 500,
        },
      },
    },
    DatePicker: {
      styles: {
        month: { width: "100%" },
        calendarHeader: { maxWidth: "unset" },
        day: {
          width: "100%",
          height: 50,
          fontWeight: 400,
        },
      },
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <Notifications />

        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>
);
