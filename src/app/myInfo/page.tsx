"use client";

import { Container, Flex } from "@mantine/core";

const Main = () => {
  return (
    <Container
      size={"xs"}
      p={0}
      bg="gray.0"
      h={"calc(100vh - 52px)"}
      style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}
    >
      <Flex direction={"column"} rowGap={"sm"}>
        복지포인트
      </Flex>
    </Container>
  );
};

export default Main;
