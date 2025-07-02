import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timelinePlugin from "@fullcalendar/timeline";
import { useRef, useState } from "react";
// import printPlugin from '@fullcalendar/print';
import { MEETING_ROOMS, MEETING_ROOMS_COLUMNS } from "@/lib/enums/meeting/meeting";
import "@/styles/meeting/meeting.css";
import koLocale from "@fullcalendar/core/locales/ko";
import { useDisclosure } from "@mantine/hooks";
import RegistMeeting from "../regist";
import UpdateMeeting from "../update";
const HorizontalTimeline = ({ details }: { details?: any }) => {
  const [registMeetingOpened, { open: openRegistMeeting, close: closeRegistMeeting }] = useDisclosure(false);
  const [udpateMeetingOpened, { open: openUpdateMeeting, close: closeUpdateMeeting }] = useDisclosure(false);

  const [currentTarget, setCurrentTarget] = useState();

  const handleDateSelect = (selectInfo: any) => {
    setCurrentTarget(selectInfo);
    openRegistMeeting();
  };

  const handleEventClick = (selectInfo: any) => {
    const event = selectInfo.event;
    setCurrentTarget(event);
    openUpdateMeeting();
  };

  const calendarRef = useRef(null);

  // 이벤트 드래그 전 검증 (드래그를 허용할지 결정)
  const handleEventAllow = (dropInfo, draggedEvent) => {
    console.log("드래그 검증:", {
      draggedEvent: draggedEvent,
      targetResource: dropInfo.resource?.id,
      targetDate: dropInfo.start,
    });
    // info.el.style.transform = "scale(1.3)";
    // 예: 특정 리소스로만 드래그 허용
    if (dropInfo.resource?.id === "forbidden-resource") {
      return false; // 드래그 불허
    }

    return true; // 드래그 허용
  };

  // 이벤트 드래그 완료 후 (성공적으로 드롭된 후)
  const handleEventDrop = (info) => {
    console.log("드래그 완료:", {
      event: info.event,
      oldEvent: info.oldEvent,
      oldResource: info.oldResource?.id,
      newResource: info.newResource?.id,
      delta: info.delta,
      revert: info.revert,
    });

    // 서버에 변경사항 저장
    updateEventOnServer(info.event)
      .then(() => {
        console.log("서버 업데이트 성공");
      })
      .catch((error) => {
        console.error("서버 업데이트 실패:", error);
        // 실패 시 원래 위치로 되돌리기
        info.revert();
      });
  };

  // 이벤트 드래그 시작 시
  const handleEventDragStart = (info) => {
    console.log("드래그 시작:", {
      event: info.event,
      jsEvent: info.jsEvent,
      view: info.view,
    });

    // 드래그 시작 시 스타일 변경 등

    info.el.style.opacity = "0.5";
  };

  // 이벤트 드래그 중지 시 (성공/실패 관계없이)
  const handleEventDragStop = (info) => {
    console.log("드래그 중지:", info);

    // 드래그 중지 시 스타일 복원
    info.el.style.opacity = "1";
  };

  // 서버 업데이트 함수 (예시)
  const updateEventOnServer = async (event) => {
    const eventData = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      resourceId: event.getResources()[0]?.id,
    };

    // API 호출 예시
    // const response = await fetch(`/api/events/${event.id}`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(eventData),
    // });

    // if (!response.ok) {
    //   throw new Error("서버 업데이트 실패");
    // }

    // return response.json();
  };

  return (
    <>
      <div>
        <FullCalendar
          ref={calendarRef}
          plugins={[resourceTimelinePlugin, timelinePlugin, dayGridPlugin, interactionPlugin, listPlugin]}
          initialView="resourceTimeline"
          headerToolbar={{
            left: "prev,title,next",
            right: "today",
            center: "",
          }}
          resourceAreaColumns={MEETING_ROOMS_COLUMNS}
          resources={MEETING_ROOMS}
          events={details}
          editable
          eventResizableFromStart
          droppable
          eventAllow={handleEventAllow}
          eventDrop={handleEventDrop}
          eventDragStart={handleEventDragStart}
          eventDragStop={handleEventDragStop}
          selectable
          selectMirror
          eventClick={handleEventClick}
          select={handleDateSelect}
          resourceAreaWidth={"130px"}
          locale={koLocale}
          slotMinTime="08:00:00"
          slotMaxTime="20:00:00"
          height="auto"
          nowIndicator
          slotLabelFormat={{
            hour: "numeric",
            hour12: false,
          }}
          eventClassNames={(arg) => {
            return ["custom-event-class"];
          }}
          // 이벤트 렌더링 커스터마이징
          eventContent={(arg) => {
            return {
              html: `<div class="flex gap-3">
                       <div class="text-blue-800 font-bold">${arg.event.extendedProps.meetingType}</div>
                       <strong>${arg.event.title}</strong>
                     </div>`,
            };
          }}
        />
      </div>
      {registMeetingOpened && <RegistMeeting opened={registMeetingOpened} close={closeRegistMeeting} target={currentTarget} />}
      {udpateMeetingOpened && <UpdateMeeting opened={udpateMeetingOpened} close={closeUpdateMeeting} target={currentTarget} />}
    </>
  );
};

export default HorizontalTimeline;
