"use client";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { Badge, Paper, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
const MainCalendar = ({ allAttendance }: any) => {
  const { setDateValue, innerValue, setInnerValue } = mainDateStore();

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
    const count = events.length;

    return (
      <div style={{ position: "relative" }}>
        <div>{date.getDate()}</div>
        {count > 0 && (
          <Badge
            size="sm"
            radius="sm"
            variant="light"
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
    </Paper>
  );
};

export default MainCalendar;
