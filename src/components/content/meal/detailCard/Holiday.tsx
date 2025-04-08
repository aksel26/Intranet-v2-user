"use client";

import { Button, Text } from "@mantine/core";

export const Holiday = () => {
  return (
    <Button fullWidth variant="light" size="lg" radius={"md"} color="lime.3">
      <Text size="sm" c={"lime.8"} fw={600} ta={"center"}>
        반차 또는 휴무날은 식대가 제공되지 않아요.
      </Text>
    </Button>
  );
};
