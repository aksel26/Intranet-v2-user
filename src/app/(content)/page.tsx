import Image from "next/image";
import React from "react";

export const page = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div>{children}</div>;
};
