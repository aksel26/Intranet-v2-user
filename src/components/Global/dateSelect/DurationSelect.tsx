import { Select } from "@mantine/core";
import dayjs from "dayjs";
import React, { useState } from "react";

const DurationSelect = ({ setParams, ...props }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [halfYearValue, setHalfYearValue] = useState<string | null>(Number(dayjs().month() + 1) > 6 ? "H2" : "H1");
  const selectHalfYear = (e: any) => {
    setParams((params: any) => ({ ...params, halfYear: e }));
    setHalfYearValue(e);
    setIsActive(false);
  };
  return (
    <Select
      {...props}
      comboboxProps={{
        withinPortal: false,
        transitionProps: { transition: "pop", duration: 200 },
        size: "sm",
      }}
      onChange={selectHalfYear}
      value={halfYearValue}
      data={[
        { label: "상반기", value: "H1" },
        { label: "하반기", value: "H2" },
      ]}
      size="md"
      variant="unstyled"
      fw={600}
      dropdownOpened={isActive}
      onBlur={() => setIsActive(false)}
      onClick={() => {
        setIsActive(true);
      }}
    />
  );
};

export default DurationSelect;
