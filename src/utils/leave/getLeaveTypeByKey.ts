// import { LEAVE_TYPE } from "@/lib/enums";

import { LEAVE_TYPE } from "@/lib/enums/leaveType/leaveType";

export const getLeaveTypeKey = (
  value: number | string | null
): string | undefined => {
  return LEAVE_TYPE[Number(value)];
};
