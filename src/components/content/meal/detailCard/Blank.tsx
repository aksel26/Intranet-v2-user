"use client";

import { Button, Text } from "@mantine/core";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";

export const Blank = ({ toggle }: any) => {
  return (
    <Button
      justify="space-between"
      fullWidth
      variant="light"
      size="lg"
      onClick={toggle}
      radius={"md"}
      rightSection={<ArrowRight color="#2f9e44" />}
      leftSection={<span />}
    >
      <Text
        size="sm"
        c={"blue.8"}
        fw={600}
        ta={"center"}
        style={{ alignSelf: "center" }}
      >
        식대 작성하기
      </Text>
    </Button>
  );
};
