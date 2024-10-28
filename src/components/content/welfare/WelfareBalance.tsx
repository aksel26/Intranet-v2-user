"use client";

import { Card, Text } from "@mantine/core";
import myImage from "../../../../public/images/welfarePoint.png";
import { ContentWrapper } from "../../Global/ContentWrapper";

import { ChartSummary } from "@/template/ChartSummary";
import { Comment } from "@/template/Comment";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { DateSubText } from "@/template/DateSubText";
// const DoughnutChart = dynamic(() => import("./DoughnutChart"), { ssr: false });

export const WelfareBalance = ({ welfareStats }: any) => {
  const pathname = usePathname();

  // const [currentPage, setCurrentPage] = useState(pathname);

  console.log(welfareStats);

  return (
    <ContentWrapper>
      <Comment myImage={myImage}>
        <Text c={"blue.9"}>
          현재 잔여 복지포인트는 <Text component="span">~</Text>원 입니다.
        </Text>
      </Comment>
      <ChartSummary />
    </ContentWrapper>
  );
};
