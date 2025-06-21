import { Dayjs } from "dayjs";

export interface TMyInfo {
  userIdx: number;
  userName: string;
  userGender: string;
  userCell: string;
  userEmail: string;
  userBirth: string;
  userAddress: string;
  joinDate: string;
  hqName: string;
  teamName: string;
  gradeName: string;
  adminRole: string;
  checkInTime: any;
  attendance: any;
  workingMinutes: any;
  leaveTypeIdx: any;
  availCheckOutTime: string | null;
  leave: TLeaveMyInfo[];
}

export interface TLeaveMyInfo {
  commuteIdx: number;
  leaveTypeIdx: number;
  leaveType: string;
  confirmYN: string;
}

export interface EarlyCheckResult {
  leaveType: string;
  targetTime: Date;
  targetTimeRaw: Dayjs;
  currentTime: string;
  isBeforeTargetTime: boolean;
  shouldExecute: boolean;
  timeUntilTarget: number;
}
