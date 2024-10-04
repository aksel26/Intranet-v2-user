"use client";

import { Box, Container, Flex, Image, NavLink, Text } from "@mantine/core";
import { IconChevronRight, IconClover2, IconGauge, IconInfoSquareRounded, IconList, IconQrcode, IconUser, IconUserFilled } from "@tabler/icons-react";
import NextImage from "next/image";
import myImage from "../../../public/images/ACG_LOGO.png";

const Main = () => {
  return (
    <Container size={"xs"} p={0} bg="gray.0" h={"calc(100vh - 52px)"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      <Flex direction={"column"} rowGap={"xl"} p={"md"} pt={40}>
        <Flex columnGap={"xs"} align={"end"}>
          <IconUser />
          <Text fw={900} size={"1.5rem"}>
            더보기
          </Text>
        </Flex>
        <Flex bg={"#005b99"} align={"center"} mih={100} columnGap={"xl"} px={"xl"}>
          <Image component={NextImage} src={myImage} alt="My image" w={"auto"} h={"1rem"} />
          <Flex direction={"column"}>
            <Flex align={"center"} columnGap={"xs"}>
              <Text size={"xl"} fw={700} c={"white"}>
                김효효효
              </Text>
              <Text c={"white"}>위원</Text>
            </Flex>
            <Text c={"white"} size={"xs"}>
              Assessment40팀
            </Text>
          </Flex>
        </Flex>
        <Flex direction={"column"} rowGap={"md"}>
          <NavLink
            href="#required-for-focus"
            label="점심조 뽑기"
            leftSection={<IconClover2 size="1.5rem" stroke={1.1} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
          />
          <NavLink
            href="#required-for-focus"
            label="점심조 현황"
            leftSection={<IconList size="1.5rem" stroke={1.1} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
            active
          />
          <NavLink
            href="#required-for-focus"
            label="QR코드로 앱 공유하기"
            leftSection={<IconQrcode size="1.5rem" stroke={1.1} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
          />
          <NavLink
            href="#required-for-focus"
            label="문의하기"
            leftSection={<IconInfoSquareRounded size="1.5rem" stroke={1.1} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Main;
