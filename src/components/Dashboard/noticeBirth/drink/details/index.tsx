import { Modal, Box, Group, ScrollArea, Select, Stack, Text } from "@mantine/core";
import React from "react";
const names = "가나다라마바사아자차카타파하거너더러머버서어저처커터퍼허".split("");

const drinks = [
  "HOT 아메리카노",
  "ICE 아메리카노",
  "HOT 디카페인 아메리카노",
  "ICE 디카페인 아메리카노",
  "바닐라크림 콜드브루",
  "ICE 자몽허니블랙티",
  "선택안함",
];
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  name: Array.from({ length: 3 }, () => names[Math.floor(Math.random() * names.length)]).join(""),
  drink: drinks[Math.floor(Math.random() * drinks.length)],
}));

const Details = ({ opened, close }: any) => {
  return (
    <Modal opened={opened} onClose={close} title="Monthly Meeting 음료 신청 현황" centered size={"xs"}>
      <Stack gap={6}>
        {data.map((item) => (
          <Group key={item.id} wrap="nowrap">
            <Text w={20} fz={"xs"}>
              {item.id + 1}.
            </Text>
            <Text fz={"xs"}>{item.name}</Text>
            <Select
              variant="unstyled"
              size="xs"
              flex={1}
              value={item.drink}
              data={[
                "HOT 아메리카노",
                "ICE 아메리카노",
                "HOT 디카페인 아메리카노",
                "ICE 디카페인 아메리카노",
                "바닐라크림 콜드브루",
                "ICE 자몽허니블랙티",
                "선택안함",
              ]}
              fz={"xs"}
              placeholder="음료를 선택해 주세요."
            />
          </Group>
        ))}
      </Stack>
    </Modal>
  );
};

export default Details;
