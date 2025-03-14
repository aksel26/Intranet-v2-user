"use client";
import { TMyAttendance } from "@/types/apiTypes";
import { Breadcrumbs, Collapse, Container, Group, Paper, Stack, Text } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ArrowDown from "/public/icons/arrow-down.svg";
import ArrowRight from "/public/icons/arrow-right.svg";
import IconCalendar from "/public/icons/calendar.svg";

const items = [{ title: "출퇴근 관리", href: "#" }].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));
function page() {
  const [params, setParams] = useState<TMyAttendance>({
    pageNo: 1,
    perPage: 31,
    sDate: "2025-03-01",
    eDate: "2025-03-31",
  });
  const [value, setValue] = useState<Date[]>([]);
  // const { data, isLoading, isError } = useQuery({ queryKey: ["attendanceAll", params], queryFn: () => api.getMyAttendance(params) });
  const [opened, { toggle }] = useDisclosure(false);
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
      <Stack gap={1}>
        <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 출퇴근 내역을 조회합니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"md"}>
        <DatePickerInput
          // label="조회기간"
          type="range"
          locale="ko"
          highlightToday
          firstDayOfWeek={0}
          clearable
          placeholder="조회일자를 선택해 주세요."
          miw={180}
          w={"max-content"}
          styles={{ input: { letterSpacing: 1, border: "none", paddingLeft: 25 }, section: { justifyContent: "start" } }}
          valueFormat="YYYY/MM/DD"
          leftSection={<IconCalendar />}
        />
        <Stack py={"md"} gap={"md"}>
          <Stack onClick={toggle} styles={{ root: { cursor: "pointer" } }}>
            <Group gap={2} align="center" justify="space-between">
              <Stack gap={2} align="start">
                <Text c={"dimmed"} fz={"sm"}>
                  2025-03-10
                </Text>
                <Group>
                  <Text fz={"sm"}>
                    근무{" "}
                    <Text fz={"sm"} component="span">
                      (정상퇴근)
                    </Text>
                  </Text>
                  <Text fz={"sm"}>
                    09:01:10 - 16:03:28{" "}
                    <Text fz={"sm"} component="span" ml={4}>
                      (9시간 근무)
                    </Text>
                  </Text>
                </Group>
              </Stack>
              {opened ? <ArrowDown /> : <ArrowRight />}
            </Group>
            <Collapse in={opened}>
              <Text>dsdsdsd</Text>
            </Collapse>
          </Stack>
          <Stack onClick={toggle} styles={{ root: { cursor: "pointer" } }}>
            <Group gap={2} align="center" justify="space-between">
              <Stack gap={2} align="start">
                <Text c={opened ? "black" : "dimmed"} fz={opened ? "md" : "sm"} fw={opened ? 700 : 500}>
                  2025-03-10
                </Text>
                <Group>
                  <Text fz={"sm"}>
                    근무{" "}
                    <Text fz={"sm"} component="span">
                      (정상퇴근)
                    </Text>
                  </Text>
                  <Text fz={"sm"}>
                    09:01:10 - 16:03:28{" "}
                    <Text fz={"sm"} component="span" ml={4}>
                      (9시간 근무)
                    </Text>
                  </Text>
                </Group>
              </Stack>
              {opened ? <ArrowDown /> : <ArrowRight />}
            </Group>
            <Collapse in={opened}>
              <Group>
                <Stack gap={2} flex={1}>
                  <Text fz={"sm"} c={"dimmed"}>
                    근무시간
                  </Text>
                  <Text fz={"sm"}>07:02:18</Text>
                </Stack>
                <Stack gap={2} flex={1}>
                  <Text fz={"sm"} c={"dimmed"}>
                    초과시간
                  </Text>
                  <Text fz={"sm"}>00:02:18</Text>
                </Stack>
                <Stack gap={2} flex={1}>
                  <Text fz={"sm"} c={"dimmed"}>
                    출근기기
                  </Text>
                  <Text fz={"sm"}>ACG</Text>
                </Stack>
                <Stack gap={2} flex={1}>
                  <Text fz={"sm"} c={"dimmed"}>
                    첨부파일
                  </Text>
                  <Text fz={"sm"}>없음</Text>
                </Stack>
              </Group>
              <Stack gap={2} fz={"sm"} mt={"md"}>
                <Text fz={"sm"} c={"dimmed"}>
                  내용
                </Text>
                <Text fz={"sm"}>특이사항 및 수정 사유, 조기 퇴근 사유 등</Text>
              </Stack>
            </Collapse>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
}

export default page;
