"use client";
import { getHolidays } from "@/app/api/get/getApi";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { Badge, Box, Group, Paper, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
const MainCalendar = ({ allAttendance }: any) => {
  const { setDateValue, innerValue, setInnerValue, dateValue } = mainDateStore();
  const { myInfo } = myInfoStore();
  const myName = myInfo?.userName || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["holidays", { year: dayjs(dateValue).year(), month: dayjs(dateValue).month() + 1 }],
    queryFn: () =>
      getHolidays({
        month: (dayjs(dateValue).month() + 1).toString(),
        year: dayjs(dateValue).year().toString(),
      }),
  });

  const holidays = data?.data.data || [];

  const onChange = (date: any) => {
    setInnerValue(date);
    setDateValue(date);
  };

  const handleChangeMonth = (date: Date) => {
    setInnerValue(date);
    setDateValue(date);
  };

  const renderDay = (date: any, allAttendance: any) => {
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    const events = allAttendance[dateStr] || [];

    const targetHoliday = holidays.find((item: any) => item.holidayDate === dateStr);
    const isInclude = events.some((obj: any) => obj["userName"] === myName);
    const count = events.length;

    return (
      <div style={{ position: "relative" }}>
        <div className={targetHoliday ? "text-red-400" : "text-black-400"}>{date.getDate()}</div>
        {targetHoliday && <div className="absolute text-center -bottom-4 w-[60px] left-1/2 -translate-x-1/2 text-[9px] text-red-400">{targetHoliday.holidayName}</div>}
        {count > 0 && (
          <Badge
            size="sm"
            radius="sm"
            variant={isInclude ? "filled" : "light"}
            color="lime"
            style={{
              position: "absolute",
              top: -14,
              right: -14,
              fontSize: "0.6rem",
              padding: "0 4px",
              minWidth: "15px",
              height: "15px",
            }}
          >
            {count}
          </Badge>
        )}
      </div>
    );
  };

  return (
    <Paper p={"lg"} radius={"lg"}>
      <Title order={5} mb={"md"}>
        캘린더
      </Title>
      <DatePicker
        highlightToday
        locale="ko"
        onChange={onChange}
        date={innerValue}
        // onMonthSelect={() => {}}
        onPreviousMonth={(date: Date) => handleChangeMonth(date)}
        onNextMonth={(date: Date) => handleChangeMonth(date)}
        firstDayOfWeek={0}
        // onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        // level="month"
        renderDay={(date) => renderDay(date, allAttendance)} // 여기에 커스텀 renderDay 함수를 전달
      />

      <Group justify="end" mt={"md"}>
        <Box
          h={10}
          w={10}
          bg={"lime"}
          style={{
            borderRadius: 3,
          }}
        />
        <Text fz={"xs"} c={"gray"}>
          나의 휴가/연차
        </Text>
      </Group>
    </Paper>
  );
};

export default MainCalendar;
