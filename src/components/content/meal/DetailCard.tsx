"use client";

import ClickablePaper from "@/components/Global/ClickablePaper";
import { Holiday } from "./detailCard/Holiday";

export const DetailCard = ({ toggle }: any) => {
  return (
    <ClickablePaper onClick={toggle}>
      {/* <Flex justify="space-between" align={"center"}>
        <Text size="sm">입력하지 않으셨네요!</Text>
        <IconChevronRight color="gray" size={18} />
      </Flex> */}

      {/* <Attend /> */}
      <Holiday />
    </ClickablePaper>
  );
};
