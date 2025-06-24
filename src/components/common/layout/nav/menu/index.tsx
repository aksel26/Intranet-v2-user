// import { useHasNew } from "@/hooks/useHasNew";
import { useHasNew } from "@/hooks/useHasNew";
import { MENU_ITEMS, type NavItemProps } from "@/lib/enums/menu/navMenu";
import { useNavStore } from "@/store/navStore";
// import {  NavItemProps } from "@/lib/enums";
// import { useNavStore } from "@/lib/store/toggleStore";
import { Badge, Box, Group, NavLink, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
// import Link from "next/link";
import { memo, useCallback } from "react";

interface NavItemWithIndicatorProps {
  child: any;
  index: number;
  hasNew: boolean;
  clickMenu: () => void;
}

// Indicator가 있는 NavLink 컴포넌트를 별도로 분리
const NavItemWithIndicator = memo(
  ({ child, index, hasNew, clickMenu }: NavItemWithIndicatorProps) => (
    <NavLink
      pos="relative"
      onClick={clickMenu}
      key={`${child.label}-${index}`}
      href={child.href}
      label={
        <Group>
          <Text fz="sm">{child.label}</Text>
          {hasNew && (
            <Badge size="xs" variant="light">
              New
            </Badge>
          )}
        </Group>
      }
    />
  )
);

NavItemWithIndicator.displayName = "NavItemWithIndicator";

// 일반 NavLink 컴포넌트
const RegularNavItem = memo(
  ({ child, index, clickMenu }: Omit<NavItemWithIndicatorProps, "hasNew">) => (
    <NavLink
      onClick={clickMenu}
      key={`${child.label}-${index}`}
      href={child.href}
      label={child.label}
    />
  )
);

RegularNavItem.displayName = "RegularNavItem";

const NavItem = memo(({ item, clickMenu, hasNew }: NavItemProps) => {
  const renderChildNavItem = useCallback(
    (child: any, index: number) => {
      switch (child.label) {
        case "결재/승인":
          return (
            <NavItemWithIndicator
              key={`${child.label}-${index}`}
              child={child}
              index={index}
              hasNew={hasNew.approval}
              clickMenu={clickMenu}
            />
          );
        case "공지/일정":
          return (
            <NavItemWithIndicator
              key={`${child.label}-${index}`}
              child={child}
              index={index}
              hasNew={hasNew.notice}
              clickMenu={clickMenu}
            />
          );
        default:
          return (
            <RegularNavItem
              key={`${child.label}-${index}`}
              child={child}
              index={index}
              clickMenu={clickMenu}
            />
          );
      }
    },
    [hasNew, clickMenu]
  );

  return (
    <NavLink label={item.label} childrenOffset={item.childrenOffset}>
      {item.children?.map(renderChildNavItem)}
    </NavLink>
  );
});

NavItem.displayName = "NavItem";

const NavMenu = memo(() => {
  const queryClient = useQueryClient();
  const hasNew = useHasNew();
  const setMobileClose = useNavStore((state) => state.setMobileClose);

  const clickMenu = useCallback(async () => {
    setMobileClose();
    // 관련된 모든 쿼리 무효화
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["approvalNew"] }),
      queryClient.invalidateQueries({ queryKey: ["noticeNew"] }),
    ]);
  }, [setMobileClose, queryClient]);

  return (
    <Box mt="xs">
      {MENU_ITEMS.map((item, index) => (
        <NavItem
          key={`${item.label}-${index}`}
          hasNew={hasNew}
          item={item}
          clickMenu={clickMenu}
        />
      ))}
    </Box>
  );
});

NavMenu.displayName = "NavMenu";

export default NavMenu;
