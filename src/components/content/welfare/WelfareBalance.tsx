"use client";

import { NumberFormatter, Text } from "@mantine/core";
import myImage from "../../../../public/images/welfarePoint.png";
import { ContentWrapper } from "../../Global/ContentWrapper";

import { welfareStore } from "@/lib/store/welfareStore";
import { ChartSummary } from "@/template/ChartSummary";
import { Comment } from "@/template/Comment";
import { useEffect, useState } from "react";
// const DoughnutChart = dynamic(() => import("./DoughnutChart"), { ssr: false });

export const WelfareBalance = () => {
  const welfareStats = welfareStore((state) => state.welfareInfo.welfareStats);
  const [statsInfo, setStatsInfo] = useState<any>({
    balance: 0,
    budget: 0,
    expenses: 0,
  });
  useEffect(() => {
    setStatsInfo((prev: any) => ({ ...prev, balance: welfareStats.welfareBalance, budget: welfareStats.welfareBudget, expenses: welfareStats.welfareExpense }));
  }, [welfareStats]);
  return (
    <ContentWrapper>
      <Comment myImage={myImage}>
        <Text c={"blue.9"}>
          현재 잔여 복지포인트는 <NumberFormatter thousandSeparator value={welfareStats.welfareBalance || 0} />원 입니다.
        </Text>
      </Comment>
      <ChartSummary stats={statsInfo} />
    </ContentWrapper>
  );
};
