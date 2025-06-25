import { Badge } from "@mantine/core";

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
