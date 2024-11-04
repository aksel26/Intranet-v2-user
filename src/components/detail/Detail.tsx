"use client";

import { Button, Flex, Text } from "@mantine/core";

import { mealStore } from "@/lib/store/mealStore";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import { DetailCard } from "../content/meal/DetailCard";
import ModalInputForm from "../content/meal/MealInputForm";
import { calendarDateStore } from "@/lib/store/calendarDateStore";
dayjs.locale("ko");

export const Detail = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  const { meals } = mealStore((state) => state.mealInfo);

  const { calendarDate } = calendarDateStore((state) => state);

  const [targetList, setTargetList] = useState<any>();

  useEffect(() => {
    setTargetList(meals.filter((item: any) => item.start === dayjs(calendarDate.start).format("YYYY-MM-DD")));
  }, [meals, calendarDate]);

  return (
    <Flex direction="column" bg={"white"} px="md" py="lg" rowGap={"sm"}>
      <Flex justify="space-between" align={"center"}>
        <Text size="md" c={"gray.6"}>
          {dayjs(calendarDate.start).format("MM월 DD일 dddd")}
        </Text>
        <Button size="xs" leftSection={<IconArrowBack size={14} />} variant="default">
          초기화
        </Button>
      </Flex>
      <DetailCard toggle={toggle} targetList={targetList} />
      <ModalInputForm ref={modalRef} opened={opened} close={close} />
    </Flex>
  );
};
