import { Button, Divider, Flex, Group, NumberFormatter, Text } from "@mantine/core";
import React, { useCallback } from "react";
// import ArrowRight from "../../../../../public/icons/arrow-right.svg";
import { ChevronRight, Moon, Soup, Sunrise } from "lucide-react";
// import { BreakfastIcon } from "../icon/BreakfastIcon";
// import { LunchIcon } from "../icon/LunchIcon";
// import { DinnerIcon } from "../icon/DinnerIcon";

export const Attend = ({ toggle, values, type }: any) => {
  const renderIcon = useCallback((type: any) => {
    if (type === "breakfast") {
      return <Sunrise />;
    } else if (type === "lunch") {
      return <Soup />;
    } else {
      return <Moon />;
    }
  }, []);

  return (
    <Button justify="space-between" fullWidth variant="default" size="xl" onClick={toggle} radius="lg" rightSection={<ChevronRight color="gray" width={18} />} pl={"md"}>
      <Group>
        {renderIcon(type)}
        <Flex direction={"column"} align={"flex-start"} gap={2}>
          <Text size="sm" fw={500} c={"blue.6"}>
            <NumberFormatter thousandSeparator value={values?.amount || 0} suffix=" 원" />
          </Text>
          <Group gap={"xs"}>
            <Text c={"gray.6"} size="xs">
              {values?.place || "입력정보가 없습니다."}
            </Text>
            <Divider size={"xs"} orientation="vertical" />
            <Text c={"gray.6"} size="xs">
              {values?.payerName || "입력정보가 없습니다."}
            </Text>
          </Group>
        </Flex>
      </Group>
    </Button>
  );
};
