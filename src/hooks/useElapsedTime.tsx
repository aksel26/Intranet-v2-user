// hooks/useElapsedTime.js
"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";

export function useElapsedTime(initialTime: string) {
  const [elapsedTime, setElapsedTime] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(0);

  const calculateElapsedTime = () => {
    const start = dayjs(initialTime);
    const now = dayjs();
    const diffInSeconds = now.diff(start, "second");

    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setElapsedTime(formattedTime);

    const totalSecondsIn9Hours = 9 * 3600;
    const percent = Math.min((diffInSeconds / totalSecondsIn9Hours) * 100, 100);
    setPercentage(Number(percent.toFixed(2)));
  };

  useEffect(() => {
    calculateElapsedTime();
    const interval = setInterval(calculateElapsedTime, 1000);
    return () => clearInterval(interval);
  }, [initialTime]);

  return { elapsedTime, percentage };
}
