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
      { label: "휴가/연차 관리", href: "/leave" },
      { label: "시간외 근무 관리", href: "/attendance/overtime" },
    ],
  },

  {
    label: "복지",
    childrenOffset: 28,
    children: [
      { label: "식대", href: "/meal" },
      { label: "복지포인트", href: "/points" },
      { label: "활동비", href: "/activity" },
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
