// import YearSelect from "@/components/common/dateSelect/YearSelect";
// import MonthFilter from "@/components/ui/monthFilter";
import { Group } from "@mantine/core";
import React from "react";
// import UserSelect from "../userSelect";
import YearSelect from "@/components/common/select/year";
import UserSelect from "@/components/common/select/user";
import MonthFilter from "@/components/common/filter/month";

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
