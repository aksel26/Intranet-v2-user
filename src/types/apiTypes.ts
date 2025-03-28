export interface TMyAttendance {
  pageNo: number;
  perPage: number;
  sDate: string | Date | null;
  eDate: string | Date | null;
}

export interface TMyVacations {
  month: string;
  year: string;
}
export interface TApproval extends TMyVacations {
  userIdx?: number | null;
}

export interface TWorkHourStats {
  month: string;
  year: string;
}
