"use client";

import { Button, Flex, Text } from "@mantine/core";
import ClickablePaper from "../Global/ClickablePaper";
import { ContentWrapper } from "../Global/ContentWrapper";

import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack, IconChevronRight } from "@tabler/icons-react";
import BottomModal from "../Global/BottomModal";
import MealInputForm from "../content/meal/MealInputForm";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { mealStore } from "@/lib/store/mealStore";
import { currentDateStore } from "@/lib/store/dateStore";
dayjs.locale("ko");

export const Detail = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { meals } = mealStore((state) => state.mealInfo);

  const { currentDate } = currentDateStore((state) => state);

  const [targetList, setTargetList] = useState<any>();

  useEffect(() => {
    // const date = dayjs(currentDate).format("MM월 DD일 dddd");
    // setCurrentDate(date);

    setTargetList(
      meals.filter((item: any) => {
        if (item.start === dayjs(currentDate).format("YYYY-MM-DD")) {
          return item;
        }
      })
    );
  }, [currentDate]);

  console.log(targetList);

  return (
    <ContentWrapper>
      <BottomModal opened={opened} onClose={close} title={"식대입력"}>
        <MealInputForm />
      </BottomModal>
      <Flex justify="space-between" align={"center"}>
        <Text size="md" c={"gray.6"}>
          {dayjs(currentDate).date()}
        </Text>
        <Button size="xs" leftSection={<IconArrowBack size={14} />} variant="default">
          초기화
        </Button>
      </Flex>
      <ClickablePaper onClick={toggle}>
        <Flex justify="space-between" align={"center"}>
          <Text size="sm">입력하지 않으셨네요!</Text>
          <IconChevronRight color="gray" size={18} />
        </Flex>
      </ClickablePaper>
    </ContentWrapper>
  );
};
