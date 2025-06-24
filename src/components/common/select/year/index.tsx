// import { yearsList } from "@/utils/dateFomat";
import { yearsList } from "@/utils/date/range";
import { Select } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState } from "react";

const YearSelect = ({ setParams, ...props }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [yearValue, setYearValue] = useState<string | null>(
    dayjs().year().toString()
  );
  const selectYear = (e: any) => {
    setParams((params: any) => ({ ...params, year: e }));
    setYearValue(e);
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
      onChange={selectYear}
      value={yearValue}
      data={yearsList().map((item) => ({
        value: item.toString(),
        label: `${item}년`,
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

export default YearSelect;
