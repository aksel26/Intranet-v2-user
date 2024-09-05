import React from "react";
import { ContentWrapper } from "../content/ContentWrapper";
import { Button, Dialog, Flex, Modal, Paper, Text } from "@mantine/core";
import ClickablePaper from "../Global/ClickablePaper";
import MealInputForm from "../content/meal/MealInputForm";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack, IconChevronRight } from "@tabler/icons-react";

export const Detail = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <ContentWrapper>
      <Modal
        radius="md"
        transitionProps={{ transition: "slide-up", duration: 300, timingFunction: "ease" }} // transitionProps로 전환 효과 설정
        withCloseButton
        opened={opened}
        onClose={close}
        title="식대입력"
        // yOffset="85%"
        // style={{ height: "20rem" }}
      >
        <Text c={"gray.7"} size="sm">
          9월 5일 목요일
        </Text>
        <MealInputForm />
      </Modal>
      <Flex justify="space-between" align={"center"}>
        <Text size="md" c={"gray.6"}>
          9월 6일 금요일
        </Text>
        <Button size="xs" leftSection={<IconArrowBack size={14} />} variant="default">
          초기화
        </Button>
      </Flex>
      <ClickablePaper onClick={toggle}>
        <Flex justify="space-between" align={"center"}>
          <Text size="sm">입력하지 않으셨네요!</Text>
          <IconChevronRight color="gray" size={18} />
        </Flex>
      </ClickablePaper>
    </ContentWrapper>
  );
};
