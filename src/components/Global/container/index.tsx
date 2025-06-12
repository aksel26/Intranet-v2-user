import { Container } from "@mantine/core";
import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container fluid pt={50}>
      {children}
    </Container>
  );
};

export default PageContainer;
