"use client";

import { Button, Flex, Text } from "@mantine/core";

import { useDeleteMeals } from "@/hooks/useSubmitForm";
import { calendarDateStore } from "@/lib/store/calendarDateStore";
import { mealStore } from "@/lib/store/mealStore";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import { DetailCard } from "../content/meal/DetailCard";
import ModalInputForm from "../content/meal/MealInputForm";
import notification from "../GNB/Notification";
dayjs.locale("ko");

export const Detail = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  const { meals } = mealStore((state) => state.mealInfo);

  const { calendarDate } = calendarDateStore((state) => state);

  const [targetList, setTargetList] = useState<any>();

  const { mutate: deleteMeal } = useDeleteMeals();
  const queryClient = useQueryClient();
  const deleteAll = () => {
    deleteMeal(dayjs(calendarDate).format("YYYY-MM-DD"), {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["meals"] });
        notification({
          title: "식대 내역 삭제",
          message: "정상적으로 삭제되었습니다.",
          color: "green",
        });
      },
    });
  };

  useEffect(() => {
    setTargetList(meals.filter((item: any) => item.start === dayjs(calendarDate).format("YYYY-MM-DD")));
  }, [meals, calendarDate]);

  return (
    <Flex direction="column" px="sm" pb="lg" rowGap={"sm"}>
      <Flex justify="space-between" align={"center"}>
        <Text size="xs" c={"gray.6"}>
          {dayjs(calendarDate).format("MM월 DD일 dddd")}
        </Text>
        <Button size="xs" color="red" variant="outline" onClick={deleteAll}>
          모두 삭제
        </Button>
      </Flex>
      <DetailCard toggle={toggle} targetList={targetList} />
      <ModalInputForm ref={modalRef} opened={opened} close={close} />
    </Flex>
  );
};
