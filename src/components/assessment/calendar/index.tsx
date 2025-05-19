import { Button, Group, Paper, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import React from "react";

const AssessmentCalendar = () => {
  return (
    <Paper p={"lg"} radius={"lg"}>
      <Title order={5} mb={"md"}>
        캘린더
      </Title>
      <DatePicker
        highlightToday
        locale="ko"
        type="range"
        allowSingleDateInRange
        // onChange={onChange}
        // date={innerValue}
        // onMonthSelect={() => {}}
        // onPreviousMonth={(date: Date) => handleChangeMonth(date)}
        // onNextMonth={(date: Date) => handleChangeMonth(date)}
        firstDayOfWeek={0}
        onLevelChange={() => {}} // 레벨 변경 이벤트를 무시
        level="month"
        // renderDay={(date) => renderDay(date, allAttendance)} // 여기에 커스텀 renderDay 함수를 전달
      />
    </Paper>
  );
};

export default AssessmentCalendar;
