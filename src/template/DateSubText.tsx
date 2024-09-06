import { Text } from "@mantine/core";
import React from "react";

export const DateSubText = ({ date }: { date: String }) => {
  return (
    <Text c={"gray.7"} size="sm">
      {date}
    </Text>
  );
};
