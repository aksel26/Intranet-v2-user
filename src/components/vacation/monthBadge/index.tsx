import { Pill, Text } from "@mantine/core";
import React from "react";

const MonthBadge = ({ params, setParams }: any) => {
  if (!params.month) return <Text fz={"sm"}>전체 (1월 ~ 12월)</Text>;
  if (params.month.length < 1) {
    setParams((prev: any) => ({ ...prev, month: null }));
  }
  const monthArray = params.month.split(",");

  if (monthArray.length >= 1 && monthArray.length <= 11) {
    const removeMonth = ({ month }: { month: string }) => {
      if (params.month.replace(month, "").replace(/,,/g, ",").replace(/^,|,$/g, "").length < 1) {
        setParams((prev: any) => ({ ...prev, month: null }));
      } else {
        setParams((prev: any) => ({ ...prev, month: prev.month.replace(month, "").replace(/,,/g, ",").replace(/^,|,$/g, "") }));
      }
    };
    return monthArray.map((month: string, index: number) => (
      <Pill color="red" withRemoveButton key={index} styles={{ root: { background: "var(--mantine-color-blue-0)", color: "var(--mantine-color-blue-5)" } }} onRemove={() => removeMonth({ month })}>
        {month}월
      </Pill>
    ));
  } else if (monthArray.length === 12) {
    {
      return <Text fz={"sm"}>전체 (1월 ~ 12월)</Text>;
    }
  }
};

export default MonthBadge;
