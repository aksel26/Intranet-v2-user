import { DateSubText } from "@/template/DateSubText";
import { Card, Flex } from "@mantine/core";
import React from "react";
import { ListWrapper } from "./ListWrapper";

export const UsedList = () => {
  return (
    <Flex direction={"column"} rowGap={10}>
      <ListWrapper>
        <Card>
          <DateSubText date={"12월 5일 목요일"} />
        </Card>
      </ListWrapper>
    </Flex>
  );
};
