import { Text } from "@mantine/core";

export const ApprovalStatus = ({ record }: { record: any }) => {
  if (!record) return null;
  const { confirmYN, confirmDate, rejectDate } = record;
  if (confirmYN === "Y") {
    return (
      <Text fz={"xs"} c={"green.5"} miw={60}>
        승인완료
        <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
          ({confirmDate})
        </Text>
      </Text>
    );
  } else if (confirmYN === "R") {
    return (
      <Text fz={"xs"} c={"red.4"} miw={60}>
        반려
        <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
          ({rejectDate})
        </Text>
      </Text>
    );
  } else if (confirmYN === "N") {
    return (
      <Text fz={"xs"} c={"yellow.5"} miw={60}>
        승인 대기
      </Text>
    );
  }
};
