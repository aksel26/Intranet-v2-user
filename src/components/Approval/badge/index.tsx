import { Badge, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";

export const ApprovalType = ({ value }: { value: string }) => {
  const [color, setColor] = useState("orange.5");
  const [render, setRender] = useState("");

  useEffect(() => {
    if (value === "APPROVER") {
      setColor("blue.5");
      setRender("승인요청");
    } else {
      setColor("yellow.5");
      setRender("참조");
    }
  }, [value]);

  return (
    <Text
      fz={10}
      c={value === "APPROVER" ? "blue.5" : "gray.6"}
      w={35}
      bg={value === "APPROVER" ? "blue.0" : "gray.1"}
      ta={"center"}
      styles={{ root: { borderRadius: "8px" } }}
      p={3}
      px={4}
    >
      {render}
    </Text>
    // <Badge miw={70} color={color} radius="sm" size="md" variant="light">

    // </Badge>
  );
};

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
