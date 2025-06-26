export interface TNotice {
  noticeIdx: number;
  title: string;
  place: string;
  useCar: string;
  creatorName: string;
  category: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  attendeeInfo: AttendeeInfo[];
  ccUserInfo: CcUserInfo[];
  isNew: boolean;
}

export interface AttendeeInfo {
  attendeeUserIdx: number;
  attendeeUserName: string;
}

export interface CcUserInfo {
  ccUserIdx: number;
  ccUserName: string;
}
