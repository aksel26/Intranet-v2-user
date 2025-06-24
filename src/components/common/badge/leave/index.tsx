import { Badge } from "@mantine/core";

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
