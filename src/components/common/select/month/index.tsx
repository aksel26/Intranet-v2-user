// import { monthList } from "@/utils/dateFomat";
import { monthList } from "@/utils/date/range";
import { Select } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState } from "react";

const MonthSelect = ({ setParams, ...props }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [monthValue, setMonthValue] = useState<string | null>(
    (dayjs().month() + 1).toString()
  );
  const selectMonth = (e: any) => {
    setParams((params: any) => ({ ...params, month: e }));
    setMonthValue(e);
    setIsActive(false);
  };
  return (
    <Select
      {...props}
      comboboxProps={{
        withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
        transitionProps: { transition: "pop", duration: 200 },
        size: "sm",
      }}
      onChange={selectMonth}
      value={monthValue}
      data={monthList().map((item) => ({
        value: item.toString(),
        label: `${item}월`,
      }))}
      size="md"
      variant="unstyled"
      fw={500}
      dropdownOpened={isActive}
      onBlur={() => setIsActive(false)}
      onClick={() => setIsActive(true)}
    />
  );
};

export default MonthSelect;
