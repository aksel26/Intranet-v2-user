import { useNavStore } from "@/lib/store/toggleStore";
import { Box, NavLink } from "@mantine/core";
import Link from "next/link";
import { memo } from "react";

interface MenuChild {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  childrenOffset?: number;
  children?: MenuChild[];
}
interface NavItemProps {
  item: MenuItem;
  toggleDesktop: any;
}
const MENU_ITEMS: MenuItem[] = [
  {
    label: "근태",
    childrenOffset: 28,
    children: [
      { label: "출퇴근 관리", href: "/attendance/work" },
      { label: "휴가/연차 관리", href: "/attendance/vacation" },
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
      { label: "공지사항", href: "/notice" },
    ],
  },
  {
    label: "검사 * 교육 운영(임시)",
    children: [{ label: "검사 * 교육운영", href: "/assessment" }],
    // href:"/text",
  },
];

const NavItem = memo(({ item, toggleDesktop }: NavItemProps) => {
  return (
    <NavLink label={item.label} childrenOffset={item.childrenOffset}>
      {item.children?.map((child, index) => (
        <NavLink onClick={toggleDesktop} key={`${child.label}-${index}`} component={Link} href={child.href} label={child.label} />
      ))}
    </NavLink>
  );
});

NavItem.displayName = "NavItem";

const NavMenu = memo(() => {
  const mobileOpened = useNavStore((state) => state.mobileOpened);
  console.log("🚀 ~ NavMenu ~ mobileOpened:", mobileOpened);
  const toggleDesktop = useNavStore((state) => state.toggleMobile);
  return (
    <Box mt={"xs"}>
      {MENU_ITEMS.map((item, index) => (
        <NavItem key={`${item.label}-${index}`} item={item} toggleDesktop={toggleDesktop} />
      ))}
    </Box>
  );
});

NavMenu.displayName = "NavMenu";

export default NavMenu;
