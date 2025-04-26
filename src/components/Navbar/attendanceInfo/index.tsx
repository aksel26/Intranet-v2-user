import { myInfoStore } from "@/lib/store/myInfoStore";
import React from "react";
import Vacation from "./Vacation";
import Work from "./Work";
import CommuteButton from "./CommuteButton";

const AttendanceInfo = () => {
  const { myInfo } = myInfoStore();
  if (myInfo?.attendance === "연차") return <Vacation />;
  else {
    if (myInfo?.checkInTime) return <Work />;
    else return <CommuteButton />;
  }
};

export default AttendanceInfo;
