"use client";

import { ChartSummary } from "@/template/ChartSummary";
import { ContentWrapper } from "../../Global/ContentWrapper";
import Calendar from "./Calendar";
import { Comment } from "@/template/Comment";
import { NumberFormatter, Text } from "@mantine/core";
// const DoughnutChart = dynamic(() => import("./DoughnutChart"), { ssr: false });
import myImage from "../../../../public/images/Onigiri.png";
import { mealStore } from "@/lib/store/\bmealStore";

export const MealBalance = () => {
  const meal = mealStore((state) => state.mealInfo);
  console.log("🚀 ~ MealBalance ~ meal:", meal);
  const { mealBalance } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <ContentWrapper>
      <Comment myImage={myImage}>
        <Text c={"blue.9"}>
          이번달은
          <Text mx={5} component="span" c={"blue.9"}>
            <NumberFormatter thousandSeparator value={mealBalance || 0} suffix=" 원" />
          </Text>
          남으셨네요!
        </Text>
      </Comment>
      <ChartSummary />
      <Calendar />
    </ContentWrapper>
  );
};
