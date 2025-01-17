"use client";

import { Button, Flex, Text } from "@mantine/core";
import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import IconHoliday from "../../../../../public/icons/holiday.svg";

export const Holiday = ({ toggle }: any) => {
  return (
    // <Flex justify={"space-between"} columnGap={"xl"} align={"center"} py={5}>
    //   <Flex wrap="nowrap" align={"center"} columnGap={"xs"}>
    //     <Flex bg={"blue.0"} justify={"center"} align={"center"} p={4}>
    //       <IconHoliday width={30} height={25} color={"#fdcb67"} />
    //     </Flex>
    //     <Text size="xs" c={"gray.6"} ta={"left"}>
    //       반차 / 연차일 경우 <br /> 식대가 제공되지 않습니다.
    //     </Text>
    //   </Flex>
    //   <ArrowRight color="gray" width={18} />
    // </Flex>

    <Button
      justify="space-between"
      fullWidth
      variant="light"
      size="lg"
      onClick={toggle}
      radius={"md"}
      color="lime.3"
      rightSection={<ArrowRight color="#2f9e44" />}
      leftSection={<span />}
    >
      <Text
        size="sm"
        c={"lime.8"}
        fw={600}
        ta={"center"}
        style={{ alignSelf: "center" }}
      >
        반차 또는 휴무날은 식대가 제공되지 않아요.
      </Text>
    </Button>
  );
};
