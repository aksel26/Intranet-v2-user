import { Alert, Paper, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

export const ErrorView = ({ children }: any) => {
  return (
    <Paper bg={"white"} px="lg" py="md" radius={"lg"} miw={300}>
      <Alert title={children} icon={<IconInfoCircle />} color="orange" variant="transparent" styles={{ title: { fontWeight: 500 } }}>
        <Text c="gray.8" fz={"sm"} styles={{ root: { wordBreak: "keep-all" } }}>
          문제가 지속될 경우 HR Tech팀에 문의 부탁드립니다.
        </Text>
      </Alert>
    </Paper>
  );
};

export const ErrorViewSmall = ({ children }: any) => {
  return (
    <Paper bg={"white"} px="lg" py="md" radius={"lg"}>
      <Alert title={children} icon={<IconInfoCircle />} color="orange" variant="transparent" styles={{ title: { fontWeight: 500 } }}>
        <Text c="gray.8" fz={"sm"} styles={{ root: { wordBreak: "keep-all" } }}>
          문제가 지속될 경우 HR Tech팀에 문의 부탁드립니다.
        </Text>
      </Alert>
    </Paper>
  );
};
