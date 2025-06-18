"use client";

import { useState } from "react";
// import printPlugin from '@fullcalendar/print';
import PageContainer from "@/components/Global/container";
import ReserveModal from "@/components/roomReserve/reserveModal";
import HorizontalTimeline from "@/components/roomReserve/timeline/horizontal";
import ResourceTimeGridCalendar from "@/components/roomReserve/timeline/vertical";
import { Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowsHorizontal, IconArrowsVertical } from "@tabler/icons-react";
import "../../../styles/reserveRoom.css";
// import { LicenseController } from '@fullcalendar/core/internal';
// LicenseController.key = 'YOUR_LICENSE_KEY_HERE';

// GlobalContext.Calendar.name = 'CC-Attribution-NonCommercial-NoDerivatives';  // 필수 설정
const TimelineCalendarWithPrint = () => {
  const [isMounted, setIsMounted] = useState(false);

  const [opened, { open, close }] = useDisclosure(false);

  // 자원 정의

  // 이벤트 데이터
  const [events, setEvents] = useState<any>([
    {
      id: "1",
      resourceId: "A",
      title: "팀 미팅",
      start: "2025-05-22T14:00:00",
      end: "2025-05-22T16:00:00",
      backgroundColor: "#3788d8",
      textColor: "white",
    },
    {
      id: "2",
      resourceId: "C",
      title: "제품 기획 회의",
      start: "2025-05-22T11:00:00",
      end: "2025-05-22T12:30:00",
      description: "신규 기능 브레인스토밍",
      backgroundColor: "#40c057",
      textColor: "white",
    },
    {
      id: "3",
      resourceId: "C2",
      title: "프로젝터 대여",
      start: "2025-05-22T13:00:00",
      end: "2025-05-22T17:00:00",
      description: "외부 고객 미팅용",
    },
    {
      id: "4",
      resourceId: "L1",
      title: "스프린트 계획",
      start: "2025-05-22T10:00:00",
      end: "2025-05-22T16:00:00",
      description: "다음 스프린트 작업 계획 및 할당",
    },
    {
      id: "5",
      resourceId: "G",
      title: "UI 디자인 작업",
      start: "2025-05-21T09:00:00",
      end: "2025-05-21T17:00:00",
      description: "모바일 앱 UI 리뉴얼",
    },
  ]);
  const [currentView, setCurrentView] = useState("resourceTimeline");

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  });
  // 일정 목록 인쇄

  const handleViewChange = (viewInfo: any) => {
    // 인쇄 모드가 아닐 때만 현재 뷰 저장
    // if (!printMode) {
    setCurrentView(viewInfo.view.type);

    // 현재 날짜 범위 저장
    if (viewInfo.view.currentStart && viewInfo.view.currentEnd) {
      setDateRange({
        start: viewInfo.view.currentStart,
        end: viewInfo.view.currentEnd,
      });
    }
  };

  const handleDateSelect = (selectInfo: any) => {
    if (!selectInfo.resource) {
      alert("자원을 선택해야 합니다.");
      return;
    }

    open();
    // let title = prompt("새 일정 제목을 입력하세요:");
    // let description = prompt("일정 설명을 입력하세요:");
    // let calendarApi = selectInfo.view.calendar;

    // calendarApi.unselect();

    // if (title) {
    //   const newEvent = {
    //     id: String(Date.now()),
    //     resourceId: selectInfo.resource.id,
    //     title,
    //     description,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //   };

    //   setEvents([...events, newEvent]);
    // }
  };

  const handleEventClick = (clickInfo: any) => {
    // 인쇄 모드일 때는 이벤트 클릭 처리 무시

    // 일정 상세 정보 표시
    const event = clickInfo.event;
    const description = event.extendedProps.description || "설명 없음";

    alert(`일정: ${event.title}
시간: ${event.start ? event.start.toLocaleString() : "시간 정보 없음"} ~ ${event.end ? event.end.toLocaleString() : ""}
설명: ${description}`);

    // 삭제 여부 확인
    if (confirm("이 일정을 삭제하시겠습니까?")) {
      event.remove();
      setEvents(events.filter((e: any) => e.id !== event.id));
    }
  };

  // 서버 사이드 렌더링 시 빈 div 반환
  //   if (!isMounted) {
  //     return <div className="flex items-center justify-center h-screen">로딩 중...</div>;
  //   }

  return (
    <PageContainer>
      <Group justify="space-between" align="end">
        <Stack gap={1}>
          <Title order={4}> 회의실 예약</Title>
          <Text component="span" c={"gray.6"} fz={"sm"}>
            회의실 예약 현황을 확인할 수 있습니다.
          </Text>
        </Stack>

        <Switch
          label="보기 설정"
          styles={{
            body: { flexDirection: "column-reverse", justifyContent: "center" },
            label: {
              padding: 0,
              fontSize: "12px",
              color: "var(--mantine-color-gray-6)",
            },
          }}
          onChange={() => {
            setCurrentView(currentView === "resourceTimeline" ? "resourceTimeGrid" : "resourceTimeline");
          }}
          size="md"
          color="dark.4"
          onLabel={<IconArrowsVertical size={16} stroke={2.5} color="var(--mantine-color-yellow-4)" />}
          offLabel={<IconArrowsHorizontal size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
        />
      </Group>
      <Paper bg={"white"} px="xs" py="lg" radius={"lg"} mt={"md"}>
        {currentView === "resourceTimeline" ? <HorizontalTimeline /> : <ResourceTimeGridCalendar />}
      </Paper>
      <ReserveModal opened={opened} close={close} />
    </PageContainer>
  );
};

export default TimelineCalendarWithPrint;
