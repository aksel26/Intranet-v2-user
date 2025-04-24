import { Container } from "@mantine/core";
import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      fluid
      p={"lg"}
      style={{
        scrollPaddingBottom: "52px",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
