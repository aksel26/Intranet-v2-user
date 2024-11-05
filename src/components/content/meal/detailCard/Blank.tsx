"use client";

import { Button, Text } from "@mantine/core";

export const Blank = ({ toggle }: any) => {
  return (
    <Button fullWidth variant="light" size="xl" onClick={toggle} radius={"md"}>
      <Text size="md" c={"blue.8"} fw={700} ta={"center"} style={{ alignSelf: "center" }}>
        식대 작성하기
      </Text>
    </Button>
  );
};