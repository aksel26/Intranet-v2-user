import { memo } from "react";
import { myInfoStore } from "@/store/myInfoStore";
import Vacation from "./vacation";
import Work from "./workDay";
import CommuteButton from "./buttons";

const MemoizedCommuteButton = memo(CommuteButton);
const MemoizedVacation = memo(Vacation);

const AttendanceInfo = () => {
  const { myInfo } = myInfoStore();
  console.log("myInfo:", myInfo);
  if (myInfo?.attendance === "연차") return <MemoizedVacation />;
  else {
    if (myInfo?.checkInTime) return <Work />;
    else return <MemoizedCommuteButton />;
  }
};

export default AttendanceInfo;
