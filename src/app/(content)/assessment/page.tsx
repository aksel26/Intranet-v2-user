"use client";
import AssessmentCard from "@/components/assessment/assessment";
import CreateAssessmentDrawer from "@/components/assessment/createDrawer";
import AssessmentCalendar from "@/components/assessment/calendar";
import InterviewCard from "@/components/assessment/interview";
import TrainigCard from "@/components/assessment/training";
import PageContainer from "@/components/Global/container";
import { Button, Grid, GridCol, Group, Stack, Table, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CreateDrawer from "@/components/assessment/createDrawer";
const testData = [
  {
    company: "BC",
    test: "AB닉스",
    type: "인적성",
    format: "온라인",
    time: "8시 00분 ~ 10시 30분",
    location: "ACG",
    registeredCount: 930,
    attendanceCount: 850,
    role: "알바",
    manager: "김소윤",
    note: "없음",
  },
  {
    company: "BC",
    test: "AB닉스",
    type: "인적성",
    format: "온라인",
    time: "8시 00분 ~ 20시 00분",
    location: "ACG",
    registeredCount: 937,
    attendanceCount: 869,
    role: "알바",
    manager: "김소윤",
    note: "없음",
  },
  {
    company: "BC",
    test: "AB다",
    type: "인적성",
    format: "온라인",
    time: "9시 00분 ~ 11시 30분",
    location: "ACG",
    registeredCount: 39,
    attendanceCount: 30,
    role: "알바",
    manager: "이다빈",
    note: "없음",
  },
  {
    company: "BC",
    test: "AB닉스",
    type: "인적성",
    format: "온라인",
    time: "11시 00분 ~ 13시 30분",
    location: "ACG",
    registeredCount: 931,
    attendanceCount: 859,
    role: "알바",
    manager: "김소윤",
    note: "없음",
  },
  {
    company: "BC",
    test: "AB닉스",
    type: "인적성",
    format: "온라인",
    time: "14시 30분 ~ 17시 00분",
    location: "ACG",
    registeredCount: 931,
    attendanceCount: 856,
    role: "알바",
    manager: "김소윤",
    note: "없음",
  },
];

const AssessmentManage = () => {
  const [opened, { open, close }] = useDisclosure(false);

  // const { setDateValue, innerValue, setInnerValue } = mainDateStore();

  // const onChange = (date: any) => {
  //   setInnerValue(date);
  //   setDateValue(date);
  // };

  // const handleChangeMonth = (date: Date) => {
  //   setInnerValue(date);
  //   setDateValue(date);
  // };

  const rows = testData.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td> {element.company}</Table.Td>
      <Table.Td>{element.test}</Table.Td>
      <Table.Td>{element.type}</Table.Td>
      <Table.Td>{element.format}</Table.Td>
      <Table.Td>{element.time}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.registeredCount}</Table.Td>
      <Table.Td>{element.attendanceCount}</Table.Td>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>{element.manager}</Table.Td>
      <Table.Td>{element.note}</Table.Td>
    </Table.Tr>
  ));
  return (
    <PageContainer>
      <Stack gap={1}>
        <Text size="lg" fw={600} component="a">
          검사 * 교육
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          검사 운영 관련 일정을 확인할 수 있습니다.
        </Text>
      </Stack>

      <Grid mt={"xs"}>
        <GridCol span={{ base: 12, md: 9 }}>
          <Stack gap={"md"}>
            <AssessmentCard />
            <InterviewCard />
            <TrainigCard />
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 3 }}>
          <AssessmentCalendar />
          <Button fullWidth mt={"sm"} onClick={open}>
            일정등록
          </Button>
          {/* <Group wrap="nowrap">
            <Button fullWidth mt={"sm"}>
              내용수정
            </Button>
            <Button variant="light" color="red" fullWidth mt={"sm"}>
              일정삭제
            </Button>
          </Group> */}
        </GridCol>
      </Grid>
      <CreateDrawer open={opened} close={close} />
    </PageContainer>
  );
};

export default AssessmentManage;
