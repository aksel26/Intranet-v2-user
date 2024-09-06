import { Flex, Image } from "@mantine/core";
import React from "react";
import NextImage from "next/image";

export const Comment = ({ children, myImage }: { myImage: any; children: React.ReactNode }) => {
  return (
    <Flex bg={"blue.0"} align={"center"} p={"xs"} columnGap={10}>
      <Image component={NextImage} src={myImage} alt="My image" w={"2.3rem"} h={"2.3rem"} />
      {children}
    </Flex>
  );
};
