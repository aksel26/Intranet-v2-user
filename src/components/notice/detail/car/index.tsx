import { Text } from "@mantine/core";

const Car = ({ noticeDetails }: any) => {
  console.log("noticeDetails: ", noticeDetails);
  if (!noticeDetails?.useCar || noticeDetails?.useCar.length < 1) {
    return (
      <Text fz={"xs"} c="gray">
        미사용
      </Text>
    );
  } else {
    return <Text fz={"xs"}>{noticeDetails.useCar}</Text>;
  }
};

export default Car;
