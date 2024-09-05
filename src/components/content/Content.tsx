"use client";

import { Flex, Grid, Image, rem, Space, Text } from "@mantine/core";
import NextImage from "next/image";
import myImage from "../../../public/images/Bell.png";
import { ContentWrapper } from "./ContentWrapper";
import dynamic from "next/dynamic";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Calendar from "./Calendar";
import DoughnutChart from "./DoughnutChart";
// const DoughnutChart = dynamic(() => import("./DoughnutChart"), { ssr: false });

export const Content = () => {
  return (
    <ContentWrapper>
      <Flex bg={"blue.0"} align={"center"} p={"xs"}>
        <Image component={NextImage} src={myImage} alt="My image" w={"2rem"} h={"2rem"} />
        <Text c={"blue.9"}>이번달은</Text>
        <Space w={"md"} />
        <Text c={"blue.9"}>~원</Text>
        <Space w={"md"} />
        <Text c={"blue.9"}>남으셨네요!</Text>
      </Flex>

      <Flex columnGap={"sm"}>
        <Flex p={"xs"} px="md" bg={"blue.0"} direction="column" rowGap={"4px"} w={"70%"}>
          <Flex>
            <Text w="120px">사용가능 금액</Text>
            <Text>~원</Text>
          </Flex>
          <Flex>
            <Text w="120px">사용한 금액</Text>
            <Text>~원</Text>
          </Flex>
          <Flex>
            <Text w="120px">남은 금액</Text>
            <Text size="sm">~원</Text>
          </Flex>
        </Flex>
        <Flex p={rem(8)} bg={"blue.0"} w={"30%"} mah={100} justify={"center"}>
          <DoughnutChart />
        </Flex>
      </Flex>
      <Flex>
        <Calendar />
      </Flex>
    </ContentWrapper>
  );
};
