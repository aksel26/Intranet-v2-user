export interface TMeeting {
  reservationIdx: number;
  writerIdx: number;
  writerName: string;
  title: string;
  content: any;
  meetingDate: string;
  start: string;
  end: string;
  meetingType: string;
  roomId: string;
  description: any;
  attendeeInfo: AttendeeInfo[];
  ccUserInfo: CcUserInfo[];
}

export interface AttendeeInfo {
  attendeeIdx: number;
  attendeeName: string;
}

export interface CcUserInfo {
  ccUserIdx: number;
  ccUserName: string;
}
