"use client";

import { attendanceStore } from "@/lib/store/ui/attendanceStore";
import { Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";

function AttendanceButtonWrapper({ onWorkModalOpen, offWorkModalOpen }: any) {
  const { myInfo } = attendanceStore();

  const [checkInDone, setCheckInDone] = useState(false);
  const [checkOutDone, setCheckOutDone] = useState(false);

  useEffect(() => {
    if (myInfo?.attendance) {
      if (myInfo?.attendance.includes("출근")) {
        setCheckInDone(true);
      }
      if (myInfo?.attendance.includes("퇴근")) {
        setCheckOutDone(true);
        setCheckInDone(true);
      } else {
        setCheckOutDone(false);
      }
    }
  }, [myInfo]);

  return (
    <Group wrap="nowrap" my="sm">
      <Button fullWidth variant="filled" onClick={onWorkModalOpen} disabled={checkInDone}>
        {checkInDone ? "출근완료" : "출근하기"}
      </Button>
      <Button fullWidth variant="filled" disabled={checkOutDone} onClick={offWorkModalOpen}>
        {checkOutDone ? "퇴근완료" : "퇴근하기"}
      </Button>
    </Group>
  );
}

export default AttendanceButtonWrapper;
