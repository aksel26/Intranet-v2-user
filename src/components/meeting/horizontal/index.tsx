import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timelinePlugin from "@fullcalendar/timeline";
import { useState } from "react";
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
  return (
    <>
      <div>
        <FullCalendar
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
        />
      </div>
      <RegistMeeting opened={registMeetingOpened} close={closeRegistMeeting} target={currentTarget} />
      <UpdateMeeting opened={udpateMeetingOpened} close={closeUpdateMeeting} target={currentTarget} />
    </>
  );
};

export default HorizontalTimeline;
