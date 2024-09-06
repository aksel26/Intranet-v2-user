import React from "react";
import { Modal, Box, MantineTheme } from "@mantine/core";
interface BottomModalProps {
  opened: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
const BottomModal: React.FC<BottomModalProps> = ({ opened, onClose, children }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      radius="md"
      withCloseButton={false}
      title="식대입력"
      transitionProps={{ transition: "slide-up", duration: 300, timingFunction: "ease" }} // transitionProps로 전환 효과 설정
      styles={{
        // inner: {
        //   padding: 0,
        // },
        content: {
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom) + 16px)",
          maxHeight: "80vh",
          width: "90%",

          //   borderTopLeftRadius: theme.radius.lg,
          //   borderTopRightRadius: theme.radius.lg,
          // transform: "translateY(100%)",
          // animation: "slideUp 300ms ease-out forwards",
        },
      }}
    >
      <Box p="md" pt={0}>
        {children}
      </Box>
    </Modal>
  );
};

export default BottomModal;
