export interface TMyAttendance {
  pageNo: number;
  perPage: number;
  sDate: string | Date | null;
  eDate: string | Date | null;
}

export interface TYearMonth {
  month?: string;
  year: string;
}
export interface TSearchNotice {
  pageNo?: number;
  perPage?: number;
  searchWord: string;
}
export interface TApproval extends TYearMonth {
  userIdx?: number | null;
}
export interface TMyVacations extends TYearMonth {
  confirmYN?: string;
}

export interface TWorkHourStats {
  month: string;
  year: string;
}
