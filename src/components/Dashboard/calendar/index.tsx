import { Badge, Paper, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import dayjs from "dayjs";
const MainCalendar = ({ dateValue, setDateValue, allAttendance }: any) => {
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
        value={dateValue}
        onChange={setDateValue}
        onMonthSelect={() => console.log("🙏")}
        onNextMonth={setDateValue}
        onPreviousMonth={setDateValue}
        firstDayOfWeek={0}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"
        renderDay={(date) => renderDay(date, allAttendance)} // 여기에 커스텀 renderDay 함수를 전달
      />
    </Paper>
  );
};

export default MainCalendar;
