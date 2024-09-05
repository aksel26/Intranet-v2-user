"use client";
import { Flex, Group, Text } from "@mantine/core";
import { IconBowlSpoon, IconBowlSpoonFilled, IconGiftCard, IconGiftCardFilled, IconUser, IconUserFilled } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LinkComponent } from "../Global/LinkComponent";

export const Footer = () => {
  const pathname = usePathname();

  const [navClickState, setNavClickState] = useState({
    meal: true,
    welfare: false,
    myInfo: false,
  });

  const ICON_SIZE = 25;
  const COLOR = "#0069b6";
  const STROKE_WIDTH = 1;

  useEffect(() => {
    if (pathname.includes("meal")) {
      setNavClickState((prev) => ({ ...prev, meal: true, welfare: false, myInfo: false }));
    } else if (pathname.includes("welfare")) {
      setNavClickState((prev) => ({ ...prev, meal: false, welfare: true, myInfo: false }));
    } else {
      setNavClickState((prev) => ({ ...prev, meal: false, welfare: false, myInfo: true }));
    }
  }, []);

  return (
    <Group justify="space-around" align="center" h={"100%"}>
      <LinkComponent href="/meal">
        <Flex direction={"column"} justify={"center"} align={"center"} rowGap={2}>
          {navClickState.meal ? (
            <IconBowlSpoonFilled color={COLOR} size={ICON_SIZE} stroke={STROKE_WIDTH} />
          ) : (
            <IconBowlSpoon size={ICON_SIZE} stroke={STROKE_WIDTH} color={COLOR} />
          )}
          <Text size="xs">식대</Text>
        </Flex>
      </LinkComponent>
      <LinkComponent href="/welfare">
        <Flex direction={"column"} justify={"center"} align={"center"} rowGap={2}>
          {navClickState.welfare ? (
            <IconGiftCardFilled size={ICON_SIZE} stroke={STROKE_WIDTH} color={COLOR} />
          ) : (
            <IconGiftCard size={ICON_SIZE} stroke={STROKE_WIDTH} color={COLOR} />
          )}
          <Text size="xs">복지보인트</Text>
        </Flex>
      </LinkComponent>

      <LinkComponent href="/myInfo">
        <Flex direction={"column"} justify={"center"} align={"center"} rowGap={2}>
          {navClickState.myInfo ? (
            <IconUserFilled size={ICON_SIZE} stroke={STROKE_WIDTH} color={COLOR} />
          ) : (
            <IconUser size={ICON_SIZE} stroke={STROKE_WIDTH} color={COLOR} />
          )}
          <Text size="xs">내 메뉴</Text>
        </Flex>
      </LinkComponent>
    </Group>
  );
};
