import { Badge, Group, Paper, Stack, Table, Text, Textarea } from "@mantine/core";
import React from "react";
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
const TrainigCard = () => {
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
    <Paper radius={"lg"} p={"lg"}>
      <Group justify="space-between" align="center">
        <Group gap={"xs"}>
          <Text fz={"md"} fw={600}>
            2025-05-19
          </Text>
          <Badge size={"md"} radius={"sm"} color="purple">
            교육운영
          </Badge>
        </Group>
        <Stack justify="flex-end" align="end" gap={1}>
          <Group>
            <Text c={"dimmed"} w={40} fz={"xs"}>
              작성자
            </Text>
            <Text w={50} fz={"xs"}>
              김소윤
            </Text>
            <Text c={"dimmed"} w={40} fz={"xs"}>
              작성일
            </Text>
            <Text w={180} fz={"xs"}>
              2025-04-17 오후 5:18:42
            </Text>
          </Group>
          <Group>
            <Text c={"dimmed"} w={55} fz={"xs"}>
              최종 수정
            </Text>
            <Text w={50} fz={"xs"}>
              검현해
            </Text>
            <Text c={"dimmed"} w={40} fz={"xs"}>
              수정일
            </Text>
            <Text w={180} fz={"xs"}>
              2025-04-17 오후 5:18:42
            </Text>
          </Group>
        </Stack>
      </Group>
      <Text fw={600} fz={"sm"} my={4} c={"dimmed"}>
        시행 정보
      </Text>
      <Textarea
        styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
        autosize
        value={`■ 예상 규모 : 3,854명
■ 운영 매출 : 19,270,000
■ 운영 지출 : 9,607,500
■ 운영 인력 : 직원 - 10명 / 알바-39
         김현해, 김소윤, 양우연, 이다빈, 황희은, 김낙균, 김다은, 박선아, 이우경, 김대희`}
        label="내용"
        placeholder="작성 내용이 없습니다."
      />
      <Group mt={"xs"}>
        <Stack gap={1}>
          <Text c={"gray"} fz={"xs"}>
            차량
          </Text>
          <Text fz={"xs"}>미사용</Text>
        </Stack>
        <Stack gap={1}>
          <Text c={"gray"} fz={"xs"}>
            첨부파일
          </Text>
          <Text fz={"xs"}>미사용</Text>
        </Stack>
      </Group>

      <Table mt={"md"} highlightOnHover verticalSpacing={6} striped fz={11}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>그룹</Table.Th>
            <Table.Th>회사</Table.Th>
            <Table.Th>검사</Table.Th>
            <Table.Th>구분</Table.Th>
            <Table.Th>시간</Table.Th>
            <Table.Th>장소</Table.Th>
            <Table.Th>응시인원</Table.Th>
            <Table.Th>출석인원</Table.Th>
            <Table.Th>감독관</Table.Th>
            <Table.Th>ACG담당자</Table.Th>
            <Table.Th>HR담당자</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
};

export default TrainigCard;
