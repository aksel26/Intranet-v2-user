import { Group, Text } from "@mantine/core";
import dayjs from "dayjs";

const Footer = () => {
  return (
    <Group align="center" h={"100%"} justify="center">
      <Text fz={"xs"}>© {dayjs().year()} ACG</Text>
    </Group>
  );
};

export default Footer;
