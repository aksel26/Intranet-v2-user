import React from "react";
import { ContentWrapper } from "../Global/ContentWrapper";
import { Button, Dialog, Flex, Modal, Paper, Text } from "@mantine/core";
import ClickablePaper from "../Global/ClickablePaper";

import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack, IconChevronRight } from "@tabler/icons-react";
import BottomModal from "../Global/BottomModal";
import MealInputForm from "../content/meal/MealInputForm";

export const Detail = () => {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <ContentWrapper>
      <BottomModal opened={opened} onClose={close} title={"식대입력"}>
        <MealInputForm />
      </BottomModal>
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
