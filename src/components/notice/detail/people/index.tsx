import { Group, Popover, Text } from "@mantine/core";
import { Ellipsis } from "lucide-react";

const People = ({ list }: { list: any }) => {
  if (list.length >= 2) {
    return (
      <Popover width={200} position="bottom" withArrow shadow="md">
        <Popover.Target>
          <Group gap={"xs"} align="center" style={{ cursor: "pointer" }}>
            <Text fz="sm">
              {list[0].attendeeUserName || list[0].ccUserName} 외 {list.length - 1}인
            </Text>
            <Ellipsis color="var(--mantine-color-blue-5)" size={15} />
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          {list.map((cc: any, index: number) => (
            <Text key={index} fz={"sm"}>
              {cc.attendeeUserName || cc.ccUserName}
            </Text>
          ))}
        </Popover.Dropdown>
      </Popover>
    );
  } else {
    return <Text fz={"sm"}>{list[0]?.attendeeUserName || list[0]?.ccUserName || "-"}</Text>;
  }

  //   return <div>People</div>;
};

export default People;
