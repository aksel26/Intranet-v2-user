"use client";

import { activityStore } from "@/lib/store/actiivityStore";
import { mealStore } from "@/lib/store/mealStore";
import { welfareStore } from "@/lib/store/welfareStore";
import { useEffect, useState } from "react";

export default function useTopTitle({ pathName }: { pathName: string }) {
  const welfareStats = welfareStore((state) => state.welfareInfo.welfareStats);
  const mealStats = mealStore((state) => state.mealInfo.mealStats);
  //   const activityStats = activityStore((state) => state.activityInfo.activityStats);

  const [statsInfo, setStatsInfo] = useState<any>({
    balance: 0,
    budget: 0,
    expenses: 0,
  });
  const [typeTitle, setTypeTitle] = useState("");

  useEffect(() => {
    if (pathName.includes("welfare")) {
      setTypeTitle("복지포인트");
      setStatsInfo((prev: any) => ({
        ...prev,
        balance: welfareStats.welfareBalance,
        budget: welfareStats.welfareBudget,
        expenses: welfareStats.welfareExpense,
        userName: welfareStats.userName,
      }));
    } else if (pathName.includes("activity")) {
      setTypeTitle("활동비");
      //   setStatsInfo((prev: any) => ({
      //     ...prev,
      //     balance: activityStats.activityBalance,
      //     budget: activityStats.activityBudget,
      //     expenses: activityStats.activityExpense,
      //   }));
    } else {
      setTypeTitle("식대");
      setStatsInfo((prev: any) => ({
        ...prev,
        balance: mealStats.mealBalance,
        budget: mealStats.mealBudget,
        expenses: mealStats.mealExpense,
        userName: mealStats.userName,
      }));
    }
  }, [mealStats, welfareStats]);

  return { typeTitle, statsInfo };
}
