"use client";
import { Box, Drawer, Flex, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import dayjs from "dayjs";
import React from "react";
interface BottomModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  date?: Date;
}
const BottomModal: React.FC<BottomModalProps> = ({ title, date, opened, onClose, children }) => {
  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });
  return (
    <Drawer
      offset={12}
      radius="md"
      opened={opened}
      onClose={onClose}
      position="bottom"
      maw={350}
      styles={{ content: { height: "auto", maxWidth: 350, minWidth: 350, flex: matches ? 1 : "none" }, inner: { justifyContent: "center" } }}
      title={
        <Flex align="end" columnGap="sm">
          <Text fw={700} size="md">
            {title}
          </Text>
          <Text c="gray.7" size="xs">
            {date ? dayjs(date).format("MM월 DD일 dddd") : ""}
          </Text>
        </Flex>
      }
    >
      <Box p="xs" pt={0}>
        {children}
      </Box>
    </Drawer>
  );
};

export default BottomModal;
