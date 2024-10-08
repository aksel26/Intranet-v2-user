"use client";
import React from "react";
import { Modal, Box, MantineTheme, Text, Flex } from "@mantine/core";
interface BottomModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}
const BottomModal: React.FC<BottomModalProps> = ({ title, opened, onClose, children }) => {
  return (
    <Modal
      zIndex={1001}
      opened={opened}
      onClose={onClose}
      radius="md"
      withCloseButton={false}
      title={
        <Flex align={"end"} columnGap={"sm"}>
          <Text fw={700} size="lg">
            {title}
          </Text>
          <Text c={"gray.7"} size="sm">
            9월 5일 목요일
          </Text>
        </Flex>
      }
      transitionProps={{ transition: "slide-up", duration: 300, timingFunction: "ease" }} // transitionProps로 전환 효과 설정
      styles={{
        content: {
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom) + 16px)",
          maxHeight: "80vh",
          width: "90%",
          zIndex: 1000,
        },
      }}
    >
      <Box p="xs" pt={0}>
        {children}
      </Box>
    </Modal>
  );
};

export default BottomModal;
