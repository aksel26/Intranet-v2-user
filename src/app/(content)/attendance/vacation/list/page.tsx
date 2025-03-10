"use client";

import "@/styles/calendar.css";
import IconInfoCircle from "/public/icons/info-circle.svg";
import { useDisclosure } from "@mantine/hooks";
import {
  Badge,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Drawer,
  FileButton,
  Grid,
  GridCol,
  Group,
  Indicator,
  Input,
  List,
  Paper,
  Popover,
  Select,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";

import dayjs from "dayjs";
import "dayjs/locale/ko";
dayjs.locale("ko");
const items = [
  { title: "휴가/연차 관리", href: "#" },
  { title: "내 휴가 사용내역", href: "#" },
].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));

const CountText = ({ children }: any) => {
  return <Text size="xs">{children}</Text>;
};
function page() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Container
      fluid
      p={"lg"}
      style={{
        scrollPaddingBottom: "52px",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
      <Grid>
        <GridCol span={{ base: 12, md: 8 }}>
          <Paper bg={"white"} px="md" py="lg" radius={"lg"} h={"100%"}>
            <Group justify="space-between" align="center" mb={"xs"}>
              <Title order={5}>
                휴가 요약{" "}
                <Text component="span" c={"dimmed"} fz={"sm"} ml={"xs"}>
                  2025년 기준
                </Text>
              </Title>
            </Group>
            <Group gap={"xs"} justify="space-evenly">
              <Stack gap={4}>
                <Popover width={"auto"} position="top-start" withArrow shadow="md">
                  <Popover.Target>
                    <Group align="center" gap={4}>
                      <Text fz={"sm"}>총 연차 수</Text>
                      <ThemeIcon variant="white">
                        <IconInfoCircle />
                      </ThemeIcon>
                    </Group>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Group>
                      <Stack gap={4}>
                        <Text fz={"xs"}>현재날짜</Text>
                        <Text fz={"xs"}>2024-11-28</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>입사일</Text>
                        <Text fz={"xs"}>1999-02-19</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>근속년수</Text>
                        <Text fz={"xs"}>25년</Text>
                      </Stack>
                      <Stack gap={4}>
                        <Text fz={"xs"}>누적 연차 수</Text>
                        <Text fz={"xs"}>10개</Text>
                      </Stack>
                    </Group>
                  </Popover.Dropdown>
                </Popover>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>미승인 요청건</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    2
                  </Text>
                  건
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>사용 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
              <Divider orientation="vertical" />
              <Stack gap={4}>
                <Text fz={"sm"}>잔여 연차 수</Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={900} component="span" fz={"xl"}>
                    20
                  </Text>
                  일
                </Text>
              </Stack>
            </Group>
          </Paper>
        </GridCol>
      </Grid>
    </Container>
  );
}

export default page;
