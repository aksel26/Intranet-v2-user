import { LEAVE_TYPE } from "@/lib/enums";

export const getReturnValueByLeaveType = (input: number) => {
  // 입력값이 1~20 범위 내에 있는지 확인
  if (input < 1 || input > 20) {
    throw new Error("입력값은 1부터 20까지의 숫자여야 합니다.");
  }

  // LEAVE_TYPE enum에서 입력값에 해당하는 key 가져오기
  const leaveTypeKey = LEAVE_TYPE[input];

  // 입력값이 1인 경우 9 반환
  if (input === 1) {
    return 9;
  }

  // key에 "반반차"가 포함된 경우 7 반환
  if (leaveTypeKey.includes("반반차")) {
    return 7;
  }

  // key에 "반차"가 포함되거나 "오전" 또는 "오후"가 포함된 경우 4 반환
  if (leaveTypeKey.includes("반차") || leaveTypeKey.includes("오전") || leaveTypeKey.includes("오후")) {
    return 4;
  }

  // 그 외의 경우 0 반환 (기본값)
  return 0;
};
