import { Breadcrumbs, Container, Text } from "@mantine/core";
import React from "react";
const items = [
  { title: "근태/휴가 관리", href: "#" },
  { title: "근태관리", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));
function page() {
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
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
    </Container>
  );
}

export default page;
