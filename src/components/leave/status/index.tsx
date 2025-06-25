import { Badge, Group, Text } from "@mantine/core";
import React from "react";

const ConfirmStatus = ({ record }: any) => {
  if (record.confirmYN === "R") {
    if (record.rejectDate) {
      return (
        <Group gap={3} align="end">
          <Badge variant="light" color="red" radius="sm" size="sm">
            반려
          </Badge>
          <Text c={"dimmed"} fz={11}>
            {record.rejectDate}
          </Text>
        </Group>
      );
    }
  } else if (record.confirmYN === "Y") {
    return (
      <Badge variant="light" color="lime" radius="sm" size="sm">
        승인
      </Badge>
    );
  } else {
    return (
      <Badge variant="light" color="yellow" radius="sm" size="sm">
        승인 대기
      </Badge>
    );
  }
};

export default ConfirmStatus;
