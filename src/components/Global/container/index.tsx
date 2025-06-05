import { Container } from "@mantine/core";
import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container
      fluid
      p={"lg"}
      pt={60}
      style={{
        scrollPaddingBottom: "52px",
      }}
    >
      {children}
    </Container>
  );
};

export default PageContainer;
