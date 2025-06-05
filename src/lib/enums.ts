export const ATTENDANCE_OPTIONS = ["근무", "재택 근무", "연차/휴무", "오전 반차", "오후 반차"];

export enum LEAVE_TYPE {
  "근무" = 1,
  "오전 반차" = 2,
  "오후 반차" = 3,
  "오전 반반차" = 4,
  "오후 반반차" = 5,
  "연차" = 6,
  "특별 휴무" = 7,
  "특별 휴무(오전)" = 8,
  "특별 휴무(오후)" = 9,
  "특별 휴무(오전 반반)" = 10,
  "특별 휴무(오후 반반)" = 11,
  "대체 휴무" = 12,
  "대체 휴무(오전)" = 13,
  "대체 휴무(오후)" = 14,
  "경조 휴무" = 15,
  "보건휴가" = 16,
  "훈련" = 17,
  "훈련(오전)" = 18,
  "훈련(오후)" = 19,
  "병가" = 20,
}

export enum RELATION_TYPE {
  "APPROVER" = "승인요청",
  "CC" = "참조",
}

export const LOTTERY_EMOJI = [
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍒",
  "🍓",
  "🫐",
  "🥝",
  "🍅",
  "🫒",
  "🥥",
  "🥑",
  "🍆",
  "🥔",
  "🥕",
  "🌽",
  "🌶️",
  "🫑",
  "🥒",
  "🥬",
  "🥦",
  "🧄",
  "🧅",
  "🥜",
  "🫘",
  "🍠",
  "🍢",
  "🍣",
  "🍤",
];

interface MenuChild {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  childrenOffset?: number;
  children?: MenuChild[];
}
export interface NavItemProps {
  item: MenuItem;
  clickMenu: any;
  hasNew: { approval: boolean; notice: boolean };
}
export const MENU_ITEMS: MenuItem[] = [
  {
    label: "근태",
    childrenOffset: 28,
    children: [
      { label: "출퇴근 관리", href: "/attendance/work" },
      { label: "휴가/연차 관리", href: "/attendance/vacation" },
      { label: "시간외 근무 관리", href: "/attendance/overtime" },
    ],
  },

  {
    label: "복지",
    childrenOffset: 28,
    children: [
      { label: "식대", href: "/welfare/meal" },
      { label: "복지포인트", href: "/welfare/welfarePoint" },
      { label: "활동비", href: "/welfare/activity" },
    ],
  },
  {
    label: "기타",
    children: [
      { label: "내 정보 수정", href: "/myInfo" },
      { label: "결재/승인", href: "/approval" },
      { label: "공지/일정", href: "/notice" },
      { label: "회의실 예약", href: "/room" },
      { label: "SMS 전송", href: "/sms" },
    ],
  },
  {
    label: "검사 * 교육 운영(임시)",
    children: [{ label: "검사 * 교육운영", href: "/assessment" }],
    // href:"/text",
  },
];
