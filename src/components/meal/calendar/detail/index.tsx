import { Flex, Text } from "@mantine/core";

// import { mealStore } from "@/lib/store/mealStore";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
// import { DetailCard } from "../content/meal/DetailCard";
// import { Holiday } from "../content/meal/detailCard/Holiday";
// import ModalInputForm from "../content/meal/MealInputForm";
import { mealStore } from "@/store/benefit/meal/mealStore";
import { DetailCard } from "./cardWork";
import { Holiday } from "./cardHolidy";
import ModalInputForm from "../../create";

export const Detail = ({ date, vacationData }: any) => {
  const mealList = mealStore((state) => state.mealInfo);
  const [isVacation, setIsVacation] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [targetList, setTargetList] = useState<any>();

  useEffect(() => {
    setTargetList(mealList?.filter((item: any) => item.start === dayjs(date).format("YYYY-MM-DD"))[0]);
    setIsVacation(vacationData?.find((item: any) => item.commuteDate === dayjs(date).format("YYYY-MM-DD")));
  }, [mealList, vacationData, date]);

  return (
    <Flex direction="column" px="sm" pb="lg" rowGap={"sm"}>
      <Text size="xs" c={"gray.6"}>
        {dayjs(date).format("MM월 DD일 dddd")}
      </Text>
      {isVacation ? <Holiday toggle={toggle} /> : <DetailCard toggle={toggle} targetList={targetList} />}
      <ModalInputForm date={date} opened={opened} close={close} targetList={targetList} />
    </Flex>
  );
};
