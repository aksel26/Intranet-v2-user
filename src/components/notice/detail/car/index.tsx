import { Text } from "@mantine/core";

const Car = ({ noticeDetails }: any) => {
  if (!noticeDetails?.useCar || noticeDetails?.useCar.length < 1) {
    return (
      <Text fz={"sm"} c="gray">
        미사용
      </Text>
    );
  } else {
    return <Text fz={"sm"}>{noticeDetails.useCar}</Text>;
  }
};

export default Car;
