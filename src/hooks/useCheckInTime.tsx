import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

const TIME = 8; // 오전 8시
const CHECKIN_AVAILABLE_TIME = 6; // 오전 6시
const useCheckInTime = () => {
  const [isBefore8AM, setIsBefore8AM] = useState(false);

  const isCheckBefore8AM = () => {
    const now = dayjs();

    // 2. 오늘 날짜의 오전 8시를 기준으로 하는 dayjs 객체를 생성합니다.
    const eightAM = dayjs().hour(TIME).minute(0).second(0);

    // 3. 현재 시간이 오전 8시 이전인지 비교합니다.
    if (now.isBefore(eightAM)) {
      setIsBefore8AM(true);
    } else {
      setIsBefore8AM(false);
    }
  };

  const checkIsBefore6AM = () => {
    const now = dayjs();

    // 2. 오늘 날짜의 오전 8시를 기준으로 하는 dayjs 객체를 생성합니다.
    const sixAM = dayjs().hour(CHECKIN_AVAILABLE_TIME).minute(0).second(0);
    if (now.isBefore(sixAM)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    isCheckBefore8AM();
  }, []);

  return { isBefore8AM, checkIsBefore6AM };
};

export default useCheckInTime;
