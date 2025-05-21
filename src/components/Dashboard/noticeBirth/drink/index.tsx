import { Box, Button, Group, ScrollArea, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import Details from "./details";
import { IconChevronRight } from "@tabler/icons-react";

const MonthlyDrink = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Box px={"md"}>
      <Group justify="space-between" align="center" my={"xs"}>
        <Text fz={"sm"} fw={500} mb={10}>
          6월 Monthly Meeting 음료 신청
        </Text>
        <Group>
          <Text fz={"xs"} c={"gray"}>
            작성기한
          </Text>
          <Text fz={"xs"}>2025.05.02</Text>
        </Group>
      </Group>
      <Stack gap={"xs"}>
        <Group>
          <Text fz={"xs"} c={"gray"}>
            픽업 :
          </Text>
          <Group>
            <Text fz={"xs"}>이재명</Text>
            <Text fz={"xs"}>김문수</Text>
            <Text fz={"xs"}>이준석</Text>
            <Text fz={"xs"}>권영국</Text>
            <Text fz={"xs"}>황교안</Text>
          </Group>
        </Group>
        <Group justify="space-between" align="center">
          <Group>
            <Text fz={"xs"} c={"gray"}>
              내가 선택한 음료 :
            </Text>
            <Text fz={"xs"}>ICE 디카페인 아메리카노</Text>
          </Group>
          <Button size="compact-xs" variant="subtle" rightSection={<IconChevronRight size={15} strokeWidth={1.2} />} onClick={open}>
            전체보기
          </Button>
        </Group>
      </Stack>

      <Details opened={opened} close={close} />
    </Box>
  );
};

export default MonthlyDrink;
