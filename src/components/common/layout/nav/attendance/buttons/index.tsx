"use client";

import { Button, Group } from "@mantine/core";
import { useEffect, useState } from "react";
// import CheckIn from "../../Attendance/CheckIn";
// import CheckOutWrapper from "../../Attendance/CheckOutWrapper";
import { useDisclosure } from "@mantine/hooks";
import { myInfoStore } from "@/store/myInfoStore";
import CheckIn from "./checkIn";
import CheckOutWrapper from "./checkOut/wrapper";
// import { myInfoStore } from "@/lib/store/myInfoStore";

function CommuteButton() {
  const { myInfo } = myInfoStore();

  const [
    checkInTimeOpened,
    { open: checkInModalOpen, close: checkInModalClose },
  ] = useDisclosure(false);
  const [
    checkOutTimeOpened,
    { open: checkOutModalOpen, close: checkOutModalClose },
  ] = useDisclosure(false);

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
    <Group wrap="nowrap" mt={"xs"}>
      {checkInDone ? (
        <Button
          fullWidth
          variant="filled"
          disabled={checkOutDone}
          onClick={checkOutModalOpen}
        >
          {checkOutDone ? "퇴근완료" : "퇴근하기"}
        </Button>
      ) : (
        <Button
          fullWidth
          hidden={checkInDone}
          variant="filled"
          onClick={checkInModalOpen}
          disabled={checkInDone}
        >
          출근하기
        </Button>
      )}
      <CheckIn
        myInfo={myInfo}
        checkInModalClose={checkInModalClose}
        checkInTimeOpened={checkInTimeOpened}
      />
      <CheckOutWrapper
        myInfo={myInfo}
        checkOutModalClose={checkOutModalClose}
        checkOutTimeOpened={checkOutTimeOpened}
      />
    </Group>
  );
}

export default CommuteButton;
