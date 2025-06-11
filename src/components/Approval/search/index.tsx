import YearSelect from "@/components/Global/dateSelect/YearSelect";
import MonthFilter from "@/components/ui/monthFilter";
import { Group } from "@mantine/core";
import React from "react";
import UserSelect from "../userSelect";

const SearchApprovals = ({ setParams }: any) => {
  return (
    <Group justify="space-between" align="center">
      <Group>
        <YearSelect w={150} setParams={setParams} />
        <UserSelect w={250} setParams={setParams} />
      </Group>
      <MonthFilter trigger={setParams} />
    </Group>
  );
};

export default SearchApprovals;
