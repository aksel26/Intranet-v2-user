import { Group, Loader, Paper } from "@mantine/core";
import React from "react";

const LoadingView = () => {
  return (
    <Paper bg={"white"} px="lg" py="md" radius={"lg"} miw={300}>
      <Group justify="center" py={"lg"}>
        <Loader size={"sm"} />
      </Group>
    </Paper>
  );
};

export default LoadingView;
