import { Group, Popover, Text } from "@mantine/core";
import { Ellipsis } from "lucide-react";

const CcList = ({ ccUserInfo }: any) => {
  if (ccUserInfo.length < 1) {
    return (
      <Text c={"dimmed"} fz={"xs"}>
        참조자가 없습니다.
      </Text>
    );
  } else if (ccUserInfo.length === 1) {
    return (
      <Text c={"dimmed"} fz={"xs"}>
        {ccUserInfo[0].ccUserName}
      </Text>
    );
  } else if (ccUserInfo.length > 1) {
    return (
      <Popover position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Group gap={"xs"} align="center" style={{ cursor: "pointer" }}>
            <Text c="gray" size="xs">
              {ccUserInfo[0].ccUserName} 외 {ccUserInfo.length - 1}인
            </Text>
            <Ellipsis color="var(--mantine-color-blue-5)" size={15} />
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          {ccUserInfo.map((cc: any, index: number) => (
            <Text key={index} c={"dimmed"} fz={"xs"}>
              {cc.ccUserName}
            </Text>
          ))}
        </Popover.Dropdown>
      </Popover>
    );
  }
};

export default CcList;
