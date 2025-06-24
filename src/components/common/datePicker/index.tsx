// import { TMyAttendance } from "@/types/apiTypes";
import type { TMyAttendance } from "@/types/apiTypes/apiTypes";
import { DatePickerInput } from "@mantine/dates";
// import { IconCalendar } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Calendar } from "lucide-react";
import React, { useState } from "react";

type TDatePicker = {
  setParams: React.Dispatch<React.SetStateAction<TMyAttendance>>;
};

const DateRangePicker = ({ setParams }: TDatePicker) => {
  const [dateValue, setDateValue] = useState<[Date | null, Date | null]>([null, null]);

  const dateSelect = (val: [Date | null, Date | null]) => {
    const [sDate, eDate] = val;
    if (sDate && eDate) {
      setParams((prev: TMyAttendance) => ({ ...prev, sDate: dayjs(sDate).format("YYYY-MM-DD"), eDate: dayjs(eDate).format("YYYY-MM-DD") }));
    } else if (!sDate && !eDate) {
      setParams((prev: TMyAttendance) => ({
        ...prev,
        sDate: dayjs().startOf("month").format("YYYY-MM-DD"),
        eDate: dayjs().endOf("month").format("YYYY-MM-DD"),
      }));
    }
    setDateValue(val);
  };

  return (
    <DatePickerInput
      // label="조회기간"
      type="range"
      locale="ko"
      highlightToday
      firstDayOfWeek={0}
      clearable
      allowSingleDateInRange
      placeholder="조회일자를 선택해 주세요."
      miw={180}
      w={"max-content"}
      styles={{ input: { border: "none", paddingLeft: 25 }, section: { justifyContent: "start" } }}
      valueFormat="YYYY/MM/DD"
      leftSection={<Calendar size={20} strokeWidth={1.2} />}
      onChange={dateSelect}
      value={dateValue}
    />
  );
};

export default DateRangePicker;
