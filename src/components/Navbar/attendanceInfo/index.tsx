"use client";

import { myInfoStore } from "@/lib/store/myInfoStore";
import React, { memo } from "react";
import Vacation from "./Vacation";
import Work from "./Work";
import CommuteButton from "./CommuteButton";

const MemoizedCommuteButton = memo(CommuteButton);
const MemoizedVacation = memo(Vacation);

const AttendanceInfo = () => {
  const { myInfo } = myInfoStore();
  if (myInfo?.attendance === "연차") return <MemoizedVacation />;
  else {
    if (myInfo?.checkInTime) return <Work />;
    else return <MemoizedCommuteButton />;
  }
};

export default AttendanceInfo;
