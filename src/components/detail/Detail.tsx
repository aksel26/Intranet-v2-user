"use client";

import { Button, Flex, Text } from "@mantine/core";

import { currentDateStore } from "@/lib/store/dateStore";
import { mealStore } from "@/lib/store/mealStore";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import { DetailCard } from "../content/meal/DetailCard";
import ModalInputForm from "../content/meal/MealInputForm";
dayjs.locale("ko");

export const Detail = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { meals } = mealStore((state) => state.mealInfo);

  const { currentDate } = currentDateStore((state) => state);

  const [targetList, setTargetList] = useState<any>();

  useEffect(() => {
    setTargetList(
      meals.filter((item: any) => {
        if (item.start === dayjs(currentDate).format("YYYY-MM-DD")) {
          return item;
        }
      })
    );
  }, [currentDate]);

  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Flex direction="column" bg={"white"} px="md" py="lg" rowGap={"sm"}>
      <Flex justify="space-between" align={"center"}>
        <Text size="md" c={"gray.6"}>
          {dayjs(currentDate).date()}
        </Text>
        <Button size="xs" leftSection={<IconArrowBack size={14} />} variant="default">
          초기화
        </Button>
      </Flex>
      <DetailCard toggle={toggle} />
      <ModalInputForm ref={modalRef} opened={opened} close={close} />
    </Flex>
  );
};
