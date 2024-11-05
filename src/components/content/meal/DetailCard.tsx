"use client";

import { Blank } from "./detailCard/Blank";
import { Holiday } from "./detailCard/Holiday";
import { Attend } from "./detailCard/Working";

const mealType = ["breakfast", "lunch", "dinner"];
export const DetailCard = ({ toggle, targetList }: any) => {
  const makeArray = () => {
    return mealType.map((meal) => ({
      [meal]: targetList[0][meal],
    }));
  };

  const processMealData = (data: any) => {
    return data.map((mealItem: any) => {
      const [mealType, mealInfo] = Object.entries(mealItem)[0];
      return {
        type: mealType,
        data: mealInfo,
      };
    });
  };

  if (targetList) {
    if (targetList?.length < 1) {
      return <Blank toggle={toggle} />;
    } else if (targetList[0].lunch.attendance === "근무") {
      const foramtted = makeArray();
      const processedData = processMealData(foramtted);
      return processedData.map((item: any, index: any) => {
        return <Attend key={index} toggle={toggle} values={item} />;
      });
    } else {
      return <Holiday toggle={toggle} />;
    }
  }
};
