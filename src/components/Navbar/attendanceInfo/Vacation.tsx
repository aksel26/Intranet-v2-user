import { Box, Card, Grid, Group, Image, Text } from "@mantine/core";
import NextImage from "next/image";
import React from "react";
import vacataion from "/public/images/vacation.png";

function Vacation() {
  return (
    <Card w={"100%"} mih={100} mt={"xs"} p={"xs"}>
      <Group align="center" gap={3}>
        <Image src={vacataion} alt="vacationIcon" component={NextImage} h={70} w={70} />
        <Text c={"dimmed"}> 금일은 연차일 입니다. </Text>
      </Group>
    </Card>
  );
}

export default Vacation;
