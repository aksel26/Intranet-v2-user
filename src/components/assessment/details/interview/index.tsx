import { Badge, Divider, Group, Paper, Stack, Table, Text } from "@mantine/core";
const testData = [
  {
    category: "기타",
    company: "TT하우시스",
    event: "TT하우시스 '산학장학생 직무 PT'",
    format: "오프라인",
    time: "8:00 ~ 17:00",
    location: "ACG",
    registeredCount: 2,
    attendanceCount: 0,
    staffName1: "이예란",
    staffNote1: "없음",
    staffName2: ["이예린", "고고공"],
    staffNote2: "없음",
    additionalNote: "없음",
    contactInfo: "이재혁 선임 / 010-9000-9999",
  },
  {
    category: "기타",
    company: "TT하우시스",
    event: "TT하우시스 '산학장학생 면접 대비'",
    format: "오프라인",
    time: "9:00 ~ 18:00",
    location: "ACG",
    registeredCount: 5,
    attendanceCount: 3,
    staffName1: "이예란",
    staffNote1: "없음",
    staffName2: ["이예린", "고고공"],
    staffNote2: "없음",
    additionalNote: "면접장소 안내 필요",
    contactInfo: "이재혁 선임 / 010-9000-9999",
  },
  {
    category: "기타",
    company: "TT하우시스",
    event: "TT하우시스 '산학장학생 최종 선발'",
    format: "오프라인",
    time: "10:00 ~ 16:00",
    location: "ACG",
    registeredCount: 8,
    attendanceCount: 6,
    staffName1: "이예란",
    staffNote1: "주차 안내",
    staffName2: ["이예린", "고고공"],
    staffNote2: "없음",
    additionalNote: "최종 선발자 연락처 취합",
    contactInfo: "이재혁 선임 / 010-9000-9999",
  },
  {
    category: "기타",
    company: "TT하우시스",
    event: "TT하우시스 '산학장학생 오리엔테이션'",
    format: "오프라인",
    time: "13:00 ~ 17:30",
    location: "ACG",
    registeredCount: 10,
    attendanceCount: 8,
    staffName1: "이예란",
    staffNote1: "자료 준비",
    staffName2: ["이예린", "고고공"],
    staffNote2: "다과 준비",
    additionalNote: "교재 배부 예정",
    contactInfo: "이재혁 선임 / 010-9000-9999",
  },
];

const InterviewCard = () => {
  const rows = testData.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td> {element.category}</Table.Td>
      <Table.Td>{element.company}</Table.Td>
      <Table.Td>{element.event}</Table.Td>
      <Table.Td>{element.format}</Table.Td>
      <Table.Td>{element.time}</Table.Td>
      <Table.Td>{element.location}</Table.Td>
      <Table.Td>{element.registeredCount}</Table.Td>
      <Table.Td>{element.attendanceCount}</Table.Td>
      <Table.Td>{element.staffName1}</Table.Td>
      <Table.Td>{element.staffName2.map((item) => item)}</Table.Td>
      <Table.Td>{element.contactInfo}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Paper radius={"lg"} p={"lg"}>
      <Group justify="space-between" align="center">
        <Group gap={"xs"}>
          <Text fz={"md"} fw={500}>
            2025-05-19
          </Text>
          <Badge size={"md"} radius={"sm"} color="lime">
            면접운영
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
      <Group justify="space-between" align="center" mt={"md"} mb={4}>
        <Text fz={"sm"} c={"gray"}>
          시행 정보
        </Text>
        <Group>
          <Group gap={"xs"}>
            <Text c={"gray"} fz={"xs"}>
              차량
            </Text>
            <Text fz={"xs"}>미사용</Text>
          </Group>
          <Group gap={"xs"}>
            <Text c={"gray"} fz={"xs"}>
              첨부파일
            </Text>
            <Text fz={"xs"}>미사용</Text>
          </Group>
        </Group>
      </Group>
      <Paper bg={"gray.0"} p={"sm"}>
        <Text fz={"xs"} styles={{ root: { whiteSpace: "pre-wrap", lineHeight: 2 } }}>{`■ 예상 규모 : 3,854명
■ 운영 매출 : 19,270,000
■ 운영 지출 : 9,607,500
■ 운영 인력 : 직원 - 10명 / 알바-39
         김현해, 김소윤, 양우연, 이다빈, 황희은, 김낙균, 김다은, 박선아, 이우경, 김대희`}</Text>
      </Paper>

      <Stack gap={1} mt={"md"}>
        <Text fz={"sm"} c={"gray"}>
          검사목록 (4건)
        </Text>

        <Paper bg={"gray.0"} p={"sm"}>
          <Group>
            <Group gap={"xs"}>
              <Text fz={"xs"}>SK</Text>
              <Text fz={"xs"}>SK온</Text>
            </Group>
            <Text fz={"xs"}>8시 00분 ~ 10시 30분(ACG)</Text>
            <Group gap={"xs"}>
              <Text fz={"xs"}>온라인</Text>
              <Text fz={"xs"}>인적성</Text>
            </Group>
            <Text fz={"xs"}>
              5/12{" "}
              <Text c={"gray"} fz={"xs"} component="span">
                (출석/응시)
              </Text>
            </Text>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                감독관
              </Text>
              <Text fz={"xs"}>알바</Text>
            </Group>
            <Divider orientation="vertical" />

            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                ACG 담당자
              </Text>
              <Text fz={"xs"}>김소윤</Text>
            </Group>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                HR 담당자
              </Text>
              <Text fz={"xs"}>어어어(010-1212-1212)</Text>
            </Group>
          </Group>
          <Divider my={"xs"} />
          <Group>
            <Group gap={"xs"}>
              <Text fz={"xs"}>SK</Text>
              <Text fz={"xs"}>SK하이닉스스스</Text>
            </Group>
            <Text fz={"xs"}>8시 00분 ~ 10시 30분(ACG)</Text>
            <Group gap={"xs"}>
              <Text fz={"xs"}>온라인</Text>
              <Text fz={"xs"}>인적성</Text>
            </Group>
            <Text fz={"xs"}>
              5/12{" "}
              <Text c={"gray"} fz={"xs"} component="span">
                (출석/응시)
              </Text>
            </Text>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                감독관
              </Text>
              <Text fz={"xs"}>알바</Text>
            </Group>
            <Divider orientation="vertical" />

            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                ACG 담당자
              </Text>
              <Text fz={"xs"}>김소윤</Text>
            </Group>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                HR 담당자
              </Text>
              <Text fz={"xs"}>없음</Text>
            </Group>
          </Group>
          <Divider my={"xs"} />
          <Group>
            <Group gap={"xs"}>
              <Text fz={"xs"}>SK</Text>
              <Text fz={"xs"}>SK하이닉스스스</Text>
            </Group>
            <Text fz={"xs"}>8시 00분 ~ 10시 30분(ACG)</Text>
            <Group gap={"xs"}>
              <Text fz={"xs"}>온라인</Text>
              <Text fz={"xs"}>인적성</Text>
            </Group>
            <Text fz={"xs"}>
              5/12{" "}
              <Text c={"gray"} fz={"xs"} component="span">
                (출석/응시)
              </Text>
            </Text>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                감독관
              </Text>
              <Text fz={"xs"}>알바</Text>
            </Group>
            <Divider orientation="vertical" />

            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                ACG 담당자
              </Text>
              <Text fz={"xs"}>김소윤</Text>
            </Group>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                HR 담당자
              </Text>
              <Text fz={"xs"}>없음</Text>
            </Group>
          </Group>
          <Divider my={"xs"} />
          <Group>
            <Group gap={"xs"}>
              <Text fz={"xs"}>SK</Text>
              <Text fz={"xs"}>SK하이닉스스스</Text>
            </Group>
            <Text fz={"xs"}>8시 00분 ~ 10시 30분(ACG)</Text>
            <Group gap={"xs"}>
              <Text fz={"xs"}>온라인</Text>
              <Text fz={"xs"}>인적성</Text>
            </Group>
            <Text fz={"xs"}>
              5/12{" "}
              <Text c={"gray"} fz={"xs"} component="span">
                (출석/응시)
              </Text>
            </Text>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                감독관
              </Text>
              <Text fz={"xs"}>알바</Text>
            </Group>
            <Divider orientation="vertical" />

            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                ACG 담당자
              </Text>
              <Text fz={"xs"}>김소윤</Text>
            </Group>
            <Group gap={2}>
              <Text c={"gray"} fz={"xs"}>
                HR 담당자
              </Text>
              <Text fz={"xs"}>없음</Text>
            </Group>
          </Group>
        </Paper>
      </Stack>

      {/* <Table mt={"md"} highlightOnHover verticalSpacing={6} striped fz={11}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>그룹</Table.Th>
            <Table.Th>회사</Table.Th>
            <Table.Th>교육과정명</Table.Th>
            <Table.Th>구분</Table.Th>
            <Table.Th>시간</Table.Th>
            <Table.Th>장소</Table.Th>
            <Table.Th>예정인원</Table.Th>
            <Table.Th>출석인원</Table.Th>
            <Table.Th>ACG담당자</Table.Th>
            <Table.Th>참여인력</Table.Th>
            <Table.Th>고객사담당자</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table> */}
    </Paper>
  );
};

export default InterviewCard;
