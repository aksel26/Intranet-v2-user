import { Badge, Group, Text } from "@mantine/core";
import React from "react";

const ConfirmStatus = ({ record }: any) => {
  if (record.confirmYN === "N") {
    if (record.rejectDate) {
      return (
        <Group gap={"xs"}>
          <Text c={"dimmed"} fz={"xs"}>
            {record.rejectDate}
          </Text>
          <Badge variant="outline" color="red" radius="sm" size="sm">
            반려
          </Badge>
        </Group>
      );
    }
    return (
      <Badge variant="outline" color="yellow" radius="sm" size="sm">
        승인 대기
      </Badge>
    );
  } else {
    return (
      <Group gap={"xs"}>
        <Text c={"dimmed"} fz={"xs"}>
          {record.confirmDate}
        </Text>
        <Badge variant="outline" color="green" radius="sm" size="sm">
          승인
        </Badge>
      </Group>
    );
  }
};

export default ConfirmStatus;
