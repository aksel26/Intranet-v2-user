import { Text } from "@mantine/core";
import React from "react";

const EmptyView = () => {
  return (
    <Text ta={"center"} c={"dimmed"} fz={"xs"} py={"lg"}>
      내역이 없어요.
    </Text>
  );
};

export default EmptyView;
