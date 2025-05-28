import { approvalHasNew } from "@/app/api/get/getApi";
import { MENU_ITEMS, NavItemProps } from "@/lib/enums";
import { useNavStore } from "@/lib/store/toggleStore";
import { Box, Group, Indicator, NavLink, Text } from "@mantine/core";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { memo } from "react";

const NavItem = memo(({ item, clickMenu, hasNew }: NavItemProps) => {
  return (
    <NavLink label={item.label} childrenOffset={item.childrenOffset}>
      {item.children?.map((child, index) =>
        child.label === "결재/승인" && hasNew ? (
          <NavLink
            pos={"relative"}
            onClick={clickMenu}
            key={`${child.label}-${index}`}
            component={Link}
            href={child.href}
            label={
              <Group>
                <Indicator
                  position="middle-end"
                  label="New"
                  offset={-25}
                  color={"#238be6a6"}
                  size={16}
                  disabled={!hasNew}
                  styles={{ indicator: { fontSize: "9.5px" } }}
                >
                  <Text fz={"sm"}>{child.label}</Text>
                </Indicator>
              </Group>
            }
          />
        ) : (
          <NavLink onClick={clickMenu} key={`${child.label}-${index}`} component={Link} href={child.href} label={child.label} />
        )
      )}
    </NavLink>
  );
});

NavItem.displayName = "NavItem";

const NavMenu = memo(() => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({ queryKey: ["approvalNew"], queryFn: () => approvalHasNew() });
  const hasNew = data?.data.data.hasNew;
  const mobileOpened = useNavStore((state) => state.mobileOpened);
  const toggleDesktop = useNavStore((state) => state.toggleMobile);
  const clickMenu = async () => {
    toggleDesktop();
    await queryClient.invalidateQueries({ queryKey: ["approvalNew"] });
  };
  return (
    <Box mt={"xs"}>
      {MENU_ITEMS.map((item, index) => (
        <NavItem key={`${item.label}-${index}`} hasNew={hasNew} item={item} clickMenu={clickMenu} />
      ))}
    </Box>
  );
});

NavMenu.displayName = "NavMenu";

export default NavMenu;
