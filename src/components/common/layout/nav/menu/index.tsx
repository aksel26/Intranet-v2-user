import { useHasNew } from "@/hooks/useHasNew";
import { MENU_ITEMS, type NavItemProps } from "@/lib/enums/menu/navMenu";
import { useNavStore } from "@/store/navStore";
import { Badge, Box, Group, NavLink, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface NavItemWithIndicatorProps {
  child: any;
  index: number;
  hasNew: boolean;
  clickMenu: (item: any) => void;
}

// Indicator가 있는 NavLink 컴포넌트를 별도로 분리
const NavItemWithIndicator = memo(({ child, index, hasNew }: NavItemWithIndicatorProps) => {
  const setMobileClose = useNavStore((state) => state.setMobileClose);
  const navigate = useNavigate();
  const move = (href: string) => {
    setMobileClose();
    navigate(href);
  };
  return (
    <NavLink
      pos="relative"
      onClick={() => move(child.href)}
      key={`${child.label}-${index}`}
      label={
        <Group align="center">
          <Text fz="sm">{child.label}</Text>
          {hasNew && (
            <Badge size="xs" color="beige.5" radius="sm">
              New
            </Badge>
          )}
        </Group>
      }
    />
  );
});

NavItemWithIndicator.displayName = "NavItemWithIndicator";

// 일반 NavLink 컴포넌트
const RegularNavItem = memo(({ child, index }: Omit<NavItemWithIndicatorProps, "hasNew">) => {
  const navigate = useNavigate();
  const setMobileClose = useNavStore((state) => state.setMobileClose);
  const move = (href: string) => {
    setMobileClose();
    navigate(href);
  };

  return <NavLink key={`${child.label}-${index}`} onClick={() => move(child.href)} label={child.label} />;
});

RegularNavItem.displayName = "RegularNavItem";

const NavItem = memo(({ item, clickMenu, hasNew }: NavItemProps) => {
  const renderChildNavItem = useCallback(
    (child: any, index: number) => {
      switch (child.label) {
        case "결재/승인":
          return <NavItemWithIndicator key={`${child.label}-${index}`} child={child} index={index} hasNew={hasNew.approval} clickMenu={clickMenu} />;
        case "공지/일정":
          return <NavItemWithIndicator key={`${child.label}-${index}`} child={child} index={index} hasNew={hasNew.notice} clickMenu={clickMenu} />;
        default:
          return <RegularNavItem key={`${child.label}-${index}`} child={child} index={index} clickMenu={clickMenu} />;
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
  console.log("hasNew:", hasNew);
  const setMobileClose = useNavStore((state) => state.setMobileClose);

  const clickMenu = useCallback(async () => {
    setMobileClose();
    // setActive()
    // 관련된 모든 쿼리 무효화
    await Promise.all([queryClient.invalidateQueries({ queryKey: ["approvalNew"] }), queryClient.invalidateQueries({ queryKey: ["noticeNew"] })]);
  }, [setMobileClose, queryClient]);

  return (
    <Box mt="xs">
      {MENU_ITEMS.map((item, index) => (
        <NavItem key={`${item.label}-${index}`} hasNew={hasNew} item={item} clickMenu={clickMenu} />
      ))}
    </Box>
  );
});

NavMenu.displayName = "NavMenu";

export default NavMenu;
