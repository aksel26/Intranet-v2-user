import { getLeaveTypeKey } from "@/utils/leaveTypeKey";
import { useMemo } from "react";

// 커스텀 훅 정의
function useTimeByLeaveType(leaveTypeIdx: number | null) {
  // useMemo를 사용하여 불필요한 재계산 방지
  const totalTime = useMemo(() => {
    const result = getLeaveTypeKey(leaveTypeIdx);

    if (result?.includes("반반차")) {
      return 7;
    } else if (result?.includes("오전") || result?.includes("오후")) {
      return 4;
    }

    return 9; // 기본값
  }, [leaveTypeIdx]);

  return totalTime;
}

export default useTimeByLeaveType;
