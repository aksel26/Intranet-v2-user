import { Text } from "@mantine/core";
import { useEffect, useState } from "react";

export const ApprovalType = ({ value }: { value: string }) => {
  const [color, setColor] = useState("orange.5");
  const [render, setRender] = useState("");

  useEffect(() => {
    if (value === "APPROVER") {
      setColor("blue.5");
      setRender("승인요청");
    } else {
      setColor("yellow.5");
      setRender("참조");
    }
  }, [value]);

  return (
    <Text fz={10} c={value === "APPROVER" ? "blue.5" : "gray.6"} w={50} bg={value === "APPROVER" ? "blue.0" : "gray.1"} ta={"center"} styles={{ root: { borderRadius: "8px" } }} p={3} px={4}>
      {render}
    </Text>
    // <Badge miw={70} color={color} radius="sm" size="md" variant="light">

    // </Badge>
  );
};
