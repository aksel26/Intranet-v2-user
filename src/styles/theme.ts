import { createTheme, type MantineColorsTuple } from "@mantine/core";

const customDark: MantineColorsTuple = [
  "#f5f5f5", // 0
  "#e7e7e7", // 1
  "#cdcdcd", // 2
  "#b2b2b2", // 3
  "#9a9a9a", // 4
  "#828282", // 5
  "#6b6b6b", // 6
  "#565656", // 7
  "#434343", // 8
  "#333333", // 9 - 메인 하이라이트 색상
];

// 보조 하이라이트 색상 (베이지 계열)
const customBeige: MantineColorsTuple = [
  "#faf8f6", // 0
  "#f0e9e1", // 1
  "#e6dccb", // 2
  "#d4c4b0", // 3
  "#c3b299", // 4
  "#B59F85", // 5 - 보조 하이라이트 색상
  "#a08b71", // 6
  "#8B7355", // 7
  "#725c44", // 8
  "#5a4735", // 9
];

// 커스텀 그레이 스케일 (UI 요소용)
const customGray: MantineColorsTuple = [
  "#f8f9fa", // 0
  "#f1f3f5", // 1
  "#E5E5E5", // 2 - 구분선/테두리
  "#dee2e6", // 3
  "#ced4da", // 4
  "#999999", // 5 - 비활성 텍스트
  "#666666", // 6 - 보조 텍스트
  "#495057", // 7
  "#343a40", // 8
  "#212529", // 9
];

export const theme = createTheme({
  defaultRadius: "md",
  // primaryColor: "indigo",

  // colors: {
  //   primary: ["#e0fbff", "#cff1fd", "#a4dff4", "#76ccec", "#4fbce5", "#36b2e1", "#21aee1", "#0498c8", "#0087b4", "#0075a0"],
  // },
  colors: {
    // 커스텀 색상 추가

    dark: customDark,
    beige: customBeige,
    customGray: customGray,

    // 기본 색상 오버라이드
    gray: customGray,
  },
  // 기본 색상 설정 - 메인 하이라이트를 dark로 설정
  primaryColor: "dark",
  primaryShade: 9,

  // 기본 텍스트 색상
  black: "#333333",
  white: "#FFFFFF",
  cursorType: "pointer",

  // primaryColor: "primary",

  fontFamily: "Pretendard Variable, Pretendard, sans-serif", // 기본 폰트를 Pretendard로 설정

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
    Text: {
      styles: {
        root: {
          color: "#333333",
        },
      },
    },

    Title: {
      styles: {
        root: {
          color: "#333333",
        },
      },
    },

    Tabs: {
      styles: {
        tab: {
          "&[data-active]": {
            borderBottomColor: "#333333",
            color: "#333333",
          },
          "&:hover": {
            borderBottomColor: "#B59F85",
            color: "#B59F85",
          },
        },
      },
    },

    Divider: {
      styles: {
        root: {
          borderColor: "#E5E5E5",
        },
      },
    },
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
