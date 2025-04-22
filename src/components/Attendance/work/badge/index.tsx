import { Badge } from "@mantine/core";
import React from "react";

export const AttendanceBadge = ({ attendance }: { attendance: string | null }) => {
  if (!attendance) return null;
  if (attendance?.includes("지각")) {
    return (
      <Badge color="yellow" radius="sm" variant="light">
        {attendance}
      </Badge>
    );
  }

  return (
    <Badge color="lime" radius="sm" variant="light">
      {attendance}
    </Badge>
  );
};

export const LeavTypeBadge = ({ leaveType }: { leaveType: string | null }) => {
  if (!leaveType) return null;
  if (leaveType === "근무") {
    return (
      <Badge color="blue" radius="sm" variant="light">
        {leaveType}
      </Badge>
    );
  } else
    return (
      <Badge color="lime" radius="sm" variant="light">
        {leaveType}
      </Badge>
    );
};
