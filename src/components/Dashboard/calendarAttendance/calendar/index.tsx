"use client";
import { getHolidays } from "@/app/api/get/getApi";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { getYearsRange, monthList } from "@/utils/dateFomat";
import { ActionIcon, Badge, Box, Button, Group, Paper, Select, Text, Title } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { IconChevronDown, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
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

  const handleToday = () => {
    const today = dayjs().toDate();
    setInnerValue(today);
    setDateValue(today);
  };

  const renderDay = (date: any, allAttendance: any) => {
    const dateStr = dayjs(date).format("YYYY-MM-DD");
    const events = allAttendance[dateStr] || [];

    const targetHoliday = holidays.find((item: any) => item.holidayDate === dateStr);
    const isInclude = events.some((obj: any) => obj["userName"] === myName);
    const count = events.filter((event: any) => event.confirmYN !== "R").length;

    return (
      <div style={{ position: "relative" }}>
        <Text c={targetHoliday ? "red" : "black"} fz={"sm"}>
          {date.getDate()}
        </Text>
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
      <Group align="center" justify="space-between" mb={"md"}>
        <Title order={5}>캘린더</Title>
        <Button variant="light" size="xs" onClick={handleToday}>
          오늘
        </Button>
      </Group>
      <Group mb={"md"} align="center" justify="space-between">
        <ActionIcon variant="subtle" onClick={() => handleChangeMonth(dayjs(innerValue).subtract(1, "month").toDate())}>
          <IconChevronLeft color="gray" size={18} />
        </ActionIcon>
        <Group>
          <Select
            comboboxProps={{
              withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
              transitionProps: { transition: "pop", duration: 200 },
              size: "sm",
              width: 100,
            }}
            rightSectionPointerEvents="none"
            rightSection={<IconChevronDown size={16} />}
            value={dayjs(innerValue).year().toString()}
            onChange={(value: any) => {
              const newDate = dayjs(innerValue).year(parseInt(value)).toDate();
              handleChangeMonth(newDate);
            }}
            w={100}
            data={getYearsRange().map((item) => ({ value: item.toString(), label: `${item}년` }))}
            size="md"
            variant="unstyled"
            fw={500}
          />
          <Select
            comboboxProps={{
              withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
              transitionProps: { transition: "pop", duration: 200 },
              size: "sm",
              width: 80,
            }}
            data={monthList().map((item) => ({ value: item.toString(), label: `${item}월` }))}
            size="md"
            variant="unstyled"
            fw={500}
            w={80}
            rightSectionPointerEvents="none"
            rightSection={<IconChevronDown size={16} />}
            value={(dayjs(innerValue).month() + 1).toString()}
            onChange={(value: any) => {
              const newDate = dayjs(innerValue)
                .month(parseInt(value) - 1)
                .toDate();
              handleChangeMonth(newDate);
            }}
          />
        </Group>
        <ActionIcon variant="subtle" onClick={() => handleChangeMonth(dayjs(innerValue).add(1, "month").toDate())}>
          <IconChevronRight color="gray" size={18} />
        </ActionIcon>
      </Group>
      <DatePicker
        styles={{ calendarHeader: { display: "none" } }}
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

      <Group justify="end" mt={"xs"}>
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
