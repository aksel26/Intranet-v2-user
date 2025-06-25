import { Card, Group, Image, Text } from "@mantine/core";
import { TreePalm } from "lucide-react";

function Vacation() {
  return (
    <Card w={"100%"} mih={100} mt={"xs"} p={"xs"}>
      <Group align="center" gap={3}>
        <TreePalm />
        <Text c={"dimmed"}> 금일은 연차일 입니다. </Text>
      </Group>
    </Card>
  );
}

export default Vacation;
