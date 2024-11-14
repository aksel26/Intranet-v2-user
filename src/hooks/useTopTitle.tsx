"use client";

import { activityStore } from "@/lib/store/activityStore";
import { mealStore } from "@/lib/store/mealStore";
import { welfareStore } from "@/lib/store/welfareStore";
import { useEffect, useState } from "react";

export default function useTopTitle({ pathName }: { pathName: string }) {
  const welfareStats = welfareStore((state) => state.welfareInfo.welfareStats);
  const mealStats = mealStore((state) => state.mealInfo.mealStats);
  const activityStats = activityStore((state) => state.activityInfo.activityStats);

  const [statsInfo, setStatsInfo] = useState<any>({
    balance: 0,
    budget: 0,
    expenses: 0,
  });
  const [typeTitle, setTypeTitle] = useState("");

  useEffect(() => {
    if (pathName.includes("welfarePoint")) {
      setTypeTitle("복지포인트");
      setStatsInfo((prev: any) => ({
        ...prev,
        balance: welfareStats.welfareBalance || 0,
        budget: welfareStats.welfareBudget || 0,
        expenses: welfareStats.welfareExpense || 0,
        userName: welfareStats.userName || 0,
      }));
    } else if (pathName.includes("activity")) {
      setTypeTitle("활동비");
      setStatsInfo((prev: any) => ({
        ...prev,
        balance: activityStats.activityBalance || 0,
        budget: activityStats.activityBudget || 0,
        expenses: activityStats.activityExpense || 0,
        hqName: activityStats.hqName || 0,
      }));
    } else {
      setTypeTitle("식대");
      setStatsInfo((prev: any) => ({
        ...prev,
        balance: mealStats?.mealBalance || 0,
        budget: mealStats?.mealBudget || 0,
        expenses: mealStats?.mealExpense || 0,
        userName: mealStats?.userName || 0,
      }));
    }
  }, [mealStats, welfareStats, activityStats]);

  return { typeTitle, statsInfo };
}
