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

export const WelfareBalance = () => {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(pathname);

  const commentMemo = useMemo(() => {
    if (currentPage.includes("meal")) {
      return (
        <>
          <Comment myImage={myImage}>
            <Text c={"blue.9"}>
              이번달은
              <Text mx={5} component="span" c={"blue.9"}>
                ~원
              </Text>
              남으셨네요!
            </Text>
          </Comment>
        </>
      );
    } else if (currentPage.includes("welfare")) {
      return (
        <>
          <Comment myImage={myImage}>
            <Text c={"blue.9"}>
              현재 잔여 복지포인트는 <Text component="span">~</Text>원 입니다.
            </Text>
          </Comment>
        </>
      );
    }
  }, []);

  return (
    <ContentWrapper>
      {commentMemo}
      <ChartSummary />
    </ContentWrapper>
  );
};
