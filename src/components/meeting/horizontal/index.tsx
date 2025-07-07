import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timelinePlugin from "@fullcalendar/timeline";
import { useRef, useState } from "react";
// import printPlugin from '@fullcalendar/print';
import { meetingService } from "@/api/services/meeting/meeting.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/common/notification";
import { MEETING_ROOMS, MEETING_ROOMS_COLUMNS } from "@/lib/enums/meeting/meeting";
import "@/styles/meeting/meeting.css";
import { formatTimeHHmm, formatYYYYMMDD } from "@/utils/date/format";
import koLocale from "@fullcalendar/core/locales/ko";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import RegistMeeting from "../regist";
import UpdateMeeting from "../update";
const HorizontalTimeline = ({ details }: { details?: any }) => {
  const [registMeetingOpened, { open: openRegistMeeting, close: closeRegistMeeting }] = useDisclosure(false);
  const [udpateMeetingOpened, { open: openUpdateMeeting, close: closeUpdateMeeting }] = useDisclosure(false);
  const calendarRef = useRef(null);
  const queryClient = useQueryClient();
  const [currentTarget, setCurrentTarget] = useState();

  const updateMeeting = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(meetingService.updateMeetings, {
    onSuccess: async () => {
      close();
      notification({
        title: "회의실 예약 수정",
        color: "green",
        message: "회의실 내역이 수정되었습니다.",
      });

      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["meeting"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "오류가 발생했습니다.";
      notification({
        title: "회의실 예약 수정",
        color: "red",
        message: errorMessage,
      });
    },
  });

  const handleDateSelect = (selectInfo: any) => {
    setCurrentTarget(selectInfo);
    openRegistMeeting();
  };

  const handleEventClick = (selectInfo: any) => {
    const event = selectInfo.event;
    setCurrentTarget(event);
    openUpdateMeeting();
  };

  // // 이벤트 드래그 완료 후 (성공적으로 드롭된 후)
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

  const handleEventResize = (info) => {
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
  // 서버 업데이트 함수 (예시)
  const updateEventOnServer = async (event) => {
    const moreInfo = event._def.extendedProps;

    const eventData = {
      title: event.title || "",
      startTime: formatTimeHHmm(event.start) || "",
      endTime: formatTimeHHmm(event.end) || "",
      roomId: event.getResources()[0]?.id || "",
      meetingDate: formatYYYYMMDD(event.start),
      ccUserIdxs: moreInfo.ccUserInfo?.map((cc: any) => cc.ccUserIdx) || [],
      attendeeUserIdxs: moreInfo.attendeeInfo?.map((attendance: any) => attendance.attendeeIdx) || [],

      ...moreInfo,
    };

    delete eventData.attendeeInfo;
    delete eventData.ccUserInfo;
    delete eventData.writerName;

    updateMeeting.mutate({ body: eventData, idx: event.id });
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
          eventResize={handleEventResize}
          // eventAllow={handleEventAllow}
          eventDrop={handleEventDrop}
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
