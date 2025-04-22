import { TAttendance } from "@/lib/types/attendance";
import { calculateNumberToTime, formatTime } from "@/utils/dateFomat";
import { Text } from "@mantine/core";

const WorkTimeByLeaveType = ({ record }: { record: TAttendance }) => {
  if (record.leaveType === "연차" || record.leaveType.includes("휴무")) {
    return null;
  } else {
    const isIncomplete = !record.checkInTime || !record.checkOutTime;
    if (isIncomplete) {
      return (
        <Text fz={"xs"} c={isIncomplete ? "dimmed" : undefined}>
          <Text fz={"xs"} c={"dimmed"} component="span">
            {`출근시간: ${formatTime(record.checkInTime)}`}
          </Text>
        </Text>
      );
    } else {
      if (record.workingMinutes) {
        <Text fz={"xs"}>
          <Text fz={"xs"} component="span" ml={4}>
            {`${calculateNumberToTime(record.workingMinutes)}`}
          </Text>
        </Text>;
      }
    }
  }
};

export default WorkTimeByLeaveType;
