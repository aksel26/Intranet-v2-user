import { Paper, Text } from "@mantine/core";
import React from "react";

const EmptyView = () => {
  return (
    <Paper bg={"white"} px="lg" py="md" radius={"lg"} miw={300}>
      <Text ta={"center"} c={"dimmed"} fz={"xs"} py={"lg"}>
        내역이 없어요.
      </Text>
    </Paper>
  );
};

export default EmptyView;
