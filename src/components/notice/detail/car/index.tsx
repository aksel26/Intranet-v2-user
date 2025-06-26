import { NOTICE_CAR } from "@/lib/enums/notice/notice";
import { Text } from "@mantine/core";
import React from "react";

const Car = ({ noticeDetails }: any) => {
  if (noticeDetails.useCar === NOTICE_CAR.RENT.value) {
    return <Text fz={"xs"}>{NOTICE_CAR.RENT.label}</Text>;
  } else if (noticeDetails.useCar === NOTICE_CAR.COMPANY.value) {
    return <Text fz={"xs"}>{NOTICE_CAR.COMPANY.label}</Text>;
  } else if (noticeDetails.useCar === NOTICE_CAR.PERSONAL.value) {
    return <Text fz={"xs"}>{NOTICE_CAR.PERSONAL.label}</Text>;
  }
};

export default Car;
