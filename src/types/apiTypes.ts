export interface TMyAttendance {
  pageNo: number;
  perPage: number;
  sDate: string | Date | null;
  eDate: string | Date | null;
}

export interface TWorkHourStats {
  month: string;
  year: string;
}
