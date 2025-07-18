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
      maw={380}
      styles={{
        content: {
          height: "auto",
          maxWidth: 380,
          minWidth: 380,
          flex: matches ? 1 : "none",
        },
        inner: { justifyContent: "center" },
      }}
      title={
        <Flex align="end" columnGap="sm">
          <Text fw={500} size="md">
            {title}
          </Text>
          <Text c="gray.7" size="xs">
            {date ? dayjs(date).format("MM월 DD일 dddd") : ""}
          </Text>
        </Flex>
      }
    >
      <Box pt={0}>{children}</Box>
    </Drawer>
  );
};

export default BottomModal;
