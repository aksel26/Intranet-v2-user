import { LEAVE_TYPE } from "@/lib/enums";

export const getLeaveTypeKey = (value: number | string | null): string | undefined => {
  return LEAVE_TYPE[Number(value)];
};
