import { Modal } from "@mantine/core";
import React from "react";

const CreateNotice = ({ opened, close }: any) => {
  return (
    <Modal opened={opened} onClose={close} title="공지/일정 등록" centered>
      {/* Modal content */}
      공지일정등록
    </Modal>
  );
};

export default CreateNotice;
