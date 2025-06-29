import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timelinePlugin from "@fullcalendar/timeline";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
// import printPlugin from '@fullcalendar/print';
import koLocale from "@fullcalendar/core/locales/ko";
import "@/styles/room/room.css";
import RegistMeeting from "../regist";
import { useDisclosure } from "@mantine/hooks";
const HorizontalTimeline = () => {
  const [
    registMeetingOpened,
    { open: openRegistMeeting, close: closeRegistMeeting },
  ] = useDisclosure(false);

  const [resources, setResources] = useState([
    { id: "A", room: "A Room", limit: "6인" },
    { id: "C", room: "C Room", limit: "12인" },
    { id: "C2", room: "C_2 Room", limit: "12인" },
    { id: "G", room: "G Room", limit: "6인" },
    { id: "R", room: "R Room", limit: "12인" },
    { id: "L1", room: "L_1 Room", limit: "1인" },
    { id: "L2", room: "L_2 Room", limit: "1인" },
    { id: "S1", room: "S_1 Room", limit: "1인" },
    { id: "S2", room: "S_2 Room", limit: "1인" },
  ]);
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

  const [currentTarget, setCurrentTarget] = useState();

  const handleDateSelect = (selectInfo: any) => {
    console.log("selectInfo: ", selectInfo);
    if (!selectInfo.resource) {
      alert("자원을 선택해야 합니다.");
      return;
    }

    setCurrentTarget(selectInfo);

    openRegistMeeting();
    // open();
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
시간: ${event.start ? event.start.toLocaleString() : "시간 정보 없음"} ~ ${
      event.end ? event.end.toLocaleString() : ""
    }
설명: ${description}`);

    // 삭제 여부 확인
    if (confirm("이 일정을 삭제하시겠습니까?")) {
      event.remove();
      setEvents(events.filter((e: any) => e.id !== event.id));
    }
  };
  return (
    <div className="calendar-container calendar-print-container">
      <FullCalendar
        plugins={[
          resourceTimelinePlugin,
          timelinePlugin,
          dayGridPlugin,
          interactionPlugin,
          listPlugin,
        ]}
        initialView="resourceTimeline"
        headerToolbar={{
          left: "prev,title,next",
          right: "today",
          center: "",
        }}
        resourceAreaColumns={[
          {
            field: "room",
            headerContent: "회의실",
            width: 80,
          },
          {
            field: "limit",
            headerContent: "정원",
            width: 60,
          },
        ]}
        resources={resources}
        events={events}
        editable
        selectable
        selectMirror
        eventClick={handleEventClick}
        select={handleDateSelect}
        resourceAreaWidth={"130px"}
        // resourceAreaHeaderContent="회의실"
        locale={koLocale}
        viewDidMount={handleViewChange}
        slotMinTime="08:00:00"
        slotMaxTime="20:00:00"
        height="auto"
        nowIndicator={true}
        eventDidMount={(info) => {
          // 툴팁 추가
          const description = info.event.extendedProps.description;
          if (description) {
            info.el.title = description;
          }
        }}
        slotLabelFormat={{
          hour: "numeric",
          hour12: false,
        }}
        // views={{
        //   resourceTimelineDay: {
        //     slotDuration: "00:30:00",
        //   },
        //   //   resourceTimelineWeek: {
        //   //     slotDuration: "01:00:00",
        //   //   },
        //   listWeek: {
        //     displayEventTime: true,
        //     displayEventEnd: true,
        //     eventTimeFormat: {
        //       hour: "2-digit",
        //       minute: "2-digit",
        //       hour12: false,
        //     },
        //   },
        // }}
      />
      <RegistMeeting
        opened={registMeetingOpened}
        close={closeRegistMeeting}
        target={currentTarget}
      />
    </div>
  );
};

export default HorizontalTimeline;
