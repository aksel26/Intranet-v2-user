"use client";

import { attendanceStore } from "@/lib/store/ui/attendanceStore";
import { Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";

function AttendanceButtonWrapper({ onWorkModalOpen, offWorkModalOpen }: any) {
  const { attendance } = attendanceStore();
  const [checkOutDisable, setCheckOutDisable] = useState(false);

  useEffect(() => {
    if (!attendance) {
      setCheckOutDisable(true);
    } else {
      setCheckOutDisable(false);
    }
  }, [attendance]);

  return (
    <Group wrap="nowrap" my="sm">
      <Button fullWidth variant="filled" onClick={onWorkModalOpen}>
        출근하기
      </Button>
      <Button
        fullWidth
        variant="filled"
        disabled={checkOutDisable}
        onClick={offWorkModalOpen}
      >
        퇴근하기
      </Button>
    </Group>
  );
}

export default AttendanceButtonWrapper;
