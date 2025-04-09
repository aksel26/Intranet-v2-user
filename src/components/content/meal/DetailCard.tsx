"use client";

import { useCallback } from "react";
import { Blank } from "./detailCard/Blank";
import { Attend } from "./detailCard/Working";

const mealType = ["breakfast", "lunch", "dinner"];

export const DetailCard = ({ toggle, targetList }: any) => {
  const isAllEmpty = useCallback(
    (targetList: any, mealType: string) => {
      return !targetList[mealType]?.place && !targetList[mealType]?.amount && !targetList[mealType]?.payerName;
    },
    [targetList]
  );

  if (targetList) {
    return mealType.map((item: string, index: number) => {
      if (isAllEmpty(targetList, item)) return null;
      else return <Attend type={item} key={index} toggle={toggle} values={targetList[item]} />;
    });
  } else {
    return <Blank toggle={toggle} />;
  }
};
