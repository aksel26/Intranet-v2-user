import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from "@fullcalendar/core/locales/ko";
import "@/styles/room/room.css";
export default function VerticalTimeline() {
  // 리소스 데이터
  const [resources, setResources] = useState([
    { id: "A", title: "A", limit: "6인" },
    { id: "C", title: "C", limit: "12인" },
    { id: "C2", title: "C2", limit: "12인" },
    { id: "G", title: "G", limit: "6인" },
    { id: "R", title: "R", limit: "12인" },
    { id: "L1", title: "L1", limit: "1인" },
    { id: "L2", title: "L2", limit: "1인" },
    { id: "S1", title: "S1", limit: "1인" },
    { id: "S2", title: "S2", limit: "1인" },
  ]);

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

  // 이벤트 클릭 핸들러
  const handleEventClick = (clickInfo: any) => {
    alert(`이벤트: ${clickInfo.event.title}\n시작: ${clickInfo.event.start.toLocaleString()}\n종료: ${clickInfo.event.end.toLocaleString()}`);
  };

  // 날짜 클릭 핸들러
  const handleDateClick = (arg: any) => {
    const title = prompt("새 이벤트 제목을 입력하세요:");
    if (title) {
      const newEvent = {
        id: String(Date.now()),
        title: title,
        start: arg.dateStr,
        end: arg.dateStr,
        resourceId: arg.resource.id,
      };
      // 실제 구현시에는 setState를 통해 events 배열에 추가
      alert(`새 이벤트 "${title}"가 ${arg.resource.title}에 추가되었습니다.`);
    }
  };

  return (
    <div
      className="calendar-container calendar-print-container"
      //   style={{ height: "420px" }}
    >
      <FullCalendar
        plugins={[resourceTimeGridPlugin, interactionPlugin]}
        initialView="resourceTimeGridDay"
        headerToolbar={{
          left: "title",
          right: "prev,next today",
          center: "",
        }}
        // 리소스 설정
        resources={resources}
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
        // 이벤트 설정
        events={events}
        // 시간 설정
        slotMinTime="08:00"
        slotMaxTime="20:00"
        slotDuration="00:30:00"
        // 상호작용 설정

        editable={true}
        selectable={true}
        locale={koLocale}
        selectMirror={true}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
        // 표시 설정
        height="auto"
        slotLabelFormat={{
          hour: "numeric",
          hour12: false,
        }}
        nowIndicator={true}
        // 리소스 라벨 커스터마이징
        resourceLabelContent={(arg) => {
          return <div className="font-semibold text-xs">{arg.resource.title}</div>;
        }}
        slotLabelContent={(arg) => {
          console.log("arg: ", arg);
          return <div className="font-semibold text-xs">{arg.text}</div>;
        }}
        // 이벤트 내용 커스터마이징
        eventContent={(arg) => {
          return (
            <div className="p-1 text-xs">
              <div className="font-semibold">{arg.event.title}</div>
              <div>{arg.timeText}</div>
            </div>
          );
        }}
      />
    </div>
  );
}
