// import { EarlyCheckResult, TLeaveMyInfo } from "@/lib/types/myInfo";
import type { EarlyCheckResult, TLeaveMyInfo } from "@/types/myInfo";
import dayjs from "dayjs";

export const checkMorningLeave = (leaveData: TLeaveMyInfo[]): EarlyCheckResult | null => {
  // 오전이 포함된 휴가 찾기
  const morningLeave = leaveData.find((item: TLeaveMyInfo) => item.leaveType.includes("오전") && item.confirmYN === "Y");

  if (!morningLeave) {
    return null;
  }

  // 휴가 타입에 따른 시간 설정
  let targetTime;
  if (morningLeave.leaveType.includes("오전") && (morningLeave.leaveType.includes("반반") || morningLeave.leaveType.includes("반반차"))) {
    // 오전 + (반반 또는 반반차) → 오전 10시
    targetTime = dayjs().hour(10).minute(0).second(0);
  } else if (morningLeave.leaveType.includes("오전")) {
    // 오전만 포함 → 오후 1시 30분
    targetTime = dayjs().hour(13).minute(30).second(0);
  } else {
    return null;
  }

  // 현재 시간
  const now = dayjs();

  // 목표 시간보다 이전인지 확인
  const isBeforeTargetTime = now.isBefore(targetTime);

  return {
    leaveType: morningLeave.leaveType,
    targetTime: targetTime.toDate(),
    targetTimeRaw: targetTime,
    currentTime: now.format("A h시 m분"),
    isBeforeTargetTime,
    shouldExecute: isBeforeTargetTime,
    timeUntilTarget: targetTime.diff(now, "minute"), // 남은 시간 (분)
  };
};
