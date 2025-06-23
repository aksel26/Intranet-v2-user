import { Button, Text } from "@mantine/core";
import { ChevronRight } from "lucide-react";

export const Blank = ({ toggle }: any) => {
  return (
    <Button justify="space-between" fullWidth variant="light" size="lg" onClick={toggle} radius={"md"} rightSection={<ChevronRight color="#2f9e44" />} leftSection={<span />}>
      <Text size="sm" c={"blue.8"} fw={500} ta={"center"} style={{ alignSelf: "center" }}>
        식대 작성하기
      </Text>
    </Button>
  );
};
