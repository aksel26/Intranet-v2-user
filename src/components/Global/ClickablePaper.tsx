import React, { useState } from "react";
import { Paper, PaperProps } from "@mantine/core";

interface ClickablePaperProps extends PaperProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function ClickablePaper({ children, onClick, style, ...others }: ClickablePaperProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <Paper component="button" radius={"lg"} withBorder p="sm" py={"sm"} onClick={handleClick} {...others}>
      {children}
    </Paper>
  );
}
