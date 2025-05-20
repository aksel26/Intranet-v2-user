import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Drawer,
  FileButton,
  Grid,
  Group,
  Modal,
  NumberInput,
  Paper,
  Radio,
  Select,
  Stack,
  Table,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import React, { useState } from "react";
// const elements = [
//   { position: 6, mass: 12.011, symbol: "C", name: "Carbon" },
//   { position: 7, mass: 14.007, symbol: "N", name: "Nitrogen" },
//   { position: 39, mass: 88.906, symbol: "Y", name: "Yttrium" },
//   { position: 56, mass: 137.33, symbol: "Ba", name: "Barium" },
//   { position: 58, mass: 140.12, symbol: "Ce", name: "Cerium" },
// ];

import { IconTrash, IconPlus, IconChevronDown } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";

// 테이블 데이터 타입 정의
interface TableRow {
  id: string;
  company: string;
  test: string;
  type: string;
  format: string;
  time: string;
  location: string;
  registeredCount: number;
  attendanceCount: number;
  role: string;
  manager: string;
  note: string;
}

// 초기 테이블 데이터
const initialData: TableRow[] = [
  {
    id: dayjs().toDate().toString(),
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
];

export function EditableTable() {
  // 테이블 데이터 상태 관리
  const [data, setData] = useState<TableRow[]>(initialData);
  console.log("🚀 ~ EditableTable ~ data:", data);

  // 새 행 추가 함수
  const addRow = () => {
    const newRow: TableRow = {
      id: Date.now().toString(), // 고유 ID 생성
      company: "",
      test: "",
      type: "",
      format: "",
      time: "",
      location: "",
      registeredCount: 0,
      attendanceCount: 0,
      role: "",
      manager: "",
      note: "",
    };
    setData([...data, newRow]);
  };

  // 행 삭제 함수
  const removeRow = (id: string) => {
    setData(data.filter((item) => item.id !== id));
  };

  // 셀 데이터 업데이트 함수
  const updateCell = (id: string, field: keyof TableRow, value: any) => {
    setData(
      data.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value };
        }
        return row;
      })
    );
  };

  return (
    <Stack>
      <Group justify="space-between">
        <Text fz={"sm"} c={"gray"}>
          시행정보 입력
        </Text>
        <Button onClick={addRow} size="xs" leftSection={<IconPlus size={16} />} variant="light">
          행 추가
        </Button>
      </Group>

      <Box style={{ overflowX: "auto" }}>
        <Table striped verticalSpacing={3} fz={10} horizontalSpacing={5}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={80}>그룹</Table.Th>
              <Table.Th>회사</Table.Th>
              <Table.Th w={64}>검사</Table.Th>
              <Table.Th w={64}>구분</Table.Th>
              <Table.Th>시간</Table.Th>
              <Table.Th w={70}>장소</Table.Th>
              <Table.Th w={60}>응시인원</Table.Th>
              <Table.Th w={60}>출석인원</Table.Th>
              <Table.Th w={64}>감독관</Table.Th>
              <Table.Th w={70}>ACG 담당자</Table.Th>
              <Table.Th>HR 담당자</Table.Th>
              <Table.Th w={50}>행 삭제</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((row) => (
              <Table.Tr key={row.id}>
                <Table.Td>
                  <Select
                    value={row.company}
                    onChange={(e) => updateCell(row.id, "company", "React")}
                    placeholder="이름 입력"
                    size="xs"
                    data={["React", "Angular", "Vue", "Svelte"]}
                  />
                  {/* <TextInput value={row.company} onChange={(e) => updateCell(row.id, "company", e.target.value)} placeholder="이름 입력" size="xs" /> */}
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.test} onChange={(e) => updateCell(row.id, "test", e.target.value)} placeholder="이름 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.type} onChange={(e) => updateCell(row.id, "type", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.location} onChange={(e) => updateCell(row.id, "location", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.format} onChange={(e) => updateCell(row.id, "format", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.format} onChange={(e) => updateCell(row.id, "format", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <NumberInput
                    hideControls
                    value={row.registeredCount}
                    onChange={(val) => updateCell(row.id, "registeredCount", val)}
                    placeholder="나이 입력"
                    min={0}
                    max={150}
                    size="xs"
                  />
                </Table.Td>
                <Table.Td>
                  <NumberInput
                    hideControls
                    value={row.attendanceCount}
                    onChange={(val) => updateCell(row.id, "attendanceCount", val)}
                    placeholder="나이 입력"
                    min={0}
                    max={150}
                    size="xs"
                  />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.format} onChange={(e) => updateCell(row.id, "format", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.format} onChange={(e) => updateCell(row.id, "format", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <TextInput value={row.format} onChange={(e) => updateCell(row.id, "format", e.target.value)} placeholder="이메일 입력" size="xs" />
                </Table.Td>
                <Table.Td>
                  <ActionIcon color="red" variant="light" onClick={() => removeRow(row.id)} size="md">
                    <IconTrash size={16} />
                  </ActionIcon>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Box>
    </Stack>
  );
}

const CreateDrawer = ({ open, close }: any) => {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const [file, setFile] = useState<File | null>(null);
  const [openedAddRow, { open: addRowOpen, close: addRowClose }] = useDisclosure(false);
  const [opened, { toggle }] = useDisclosure(false);
  const [executionInfoOpened, { toggle: executionInfo }] = useDisclosure(false);

  return (
    <Modal opened={open} onClose={close} title="일정 등록" centered size="lg">
      {/* // <Drawer opened={open} onClose={close} size="60rem" title="일정 등록" position="right"> */}
      <Stack>
        <Radio.Group
          name="favoriteFramework"
          label="유형 선택"
          withAsterisk
          styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
        >
          <Group mt={4}>
            <Radio size="xs" value="react2" label="검사운영" defaultChecked />
            <Radio size="xs" value="react3" label="평가운영" defaultChecked />
            <Radio size="xs" value="svelte2" label="교육운영" />
            <Radio size="xs" value="sve3lte2" label="면접운영" />
          </Group>
        </Radio.Group>

        {/* <Group justify="center"> */}
        <Paper shadow="xs" p="xs" onClick={toggle} bg="gray.1" styles={{ root: { cursor: "pointer" } }}>
          <Group justify="space-between" align="center">
            <Text fz={"xs"}>검사 정보 입력</Text>
            <IconChevronDown size={16} />
          </Group>
        </Paper>

        {/* </Group> */}

        <Collapse in={opened}>
          <TextInput
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            label="제목"
            placeholder="제목을 입력하세요."
          />
          <Radio.Group
            name="favoriteFramework"
            label="차량 사용 여부"
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
          >
            <Group mt={4}>
              <Radio size="xs" value="react" label="사용" />
              <Radio size="xs" value="svelte" label="미사용" />
            </Group>
          </Radio.Group>

          <Stack gap={3}>
            <Text fz={"xs"} c={"gray.5"}>
              파일 첨부
            </Text>
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => (
                <Button variant="light" {...props} size="xs" w={"max-content"}>
                  파일 첨부하기
                </Button>
              )}
            </FileButton>
            {file ? (
              <Button variant="subtle" onClick={() => {}}>
                파일명: {file.name}
              </Button>
            ) : (
              <Text fz={"xs"} c={"gray.5"}>
                선택된 파일이 없습니다.
              </Text>
            )}
          </Stack>
          <Textarea
            styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
            autosize
            label="내용"
            placeholder="작성 내용이 없습니다."
            minRows={4}
            maxRows={4}
          />
        </Collapse>

        {/* <Stack gap={2}>
          <Text fz={"sm"} c={"gray"}>
            시행정보
          </Text>
          <Table verticalSpacing={4} fz={11}>
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
                <Table.Th>ACG 담당자</Table.Th>
                <Table.Th>HR 담당자</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Stack> */}
        <Paper shadow="xs" p="xs" onClick={executionInfo} bg="gray.1" styles={{ root: { cursor: "pointer" } }}>
          <Group justify="space-between" align="center">
            <Text fz={"xs"}>시행 정보 입력</Text>
            <IconChevronDown size={16} />
          </Group>
        </Paper>
        <Collapse in={executionInfoOpened}>
          {/* <EditableTable /> */}

          {/* <Paper bg="gray.1" p="xs">
            <Center py={"md"}>
              <Stack gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"}>
                  등록된 시행정보가 없습니다.
                </Text>
                <Button size="xs" variant="light" onClick={addRowOpen}>
                  추가하기
                </Button>
              </Stack>
            </Center>
          </Paper> */}

          <Paper bg="gray.1" p="xs">
            <Stack gap={"xs"}>
              <Group>
                <Text fz={"sm"}>SK</Text>
                <Text fz={"sm"}>SK 엔펄스</Text>
                <Badge radius={"sm"}>인적성</Badge>
                <Badge radius={"sm"} variant="outline" color="lime">
                  온라인
                </Badge>
              </Group>
              <Group gap={"xs"}>
                <Text c={"gray.6"} fz={"xs"}>
                  ACG
                </Text>

                <Divider orientation="vertical" />
                <Text c={"gray.6"} fz={"xs"}>
                  9시 00분 ~ 12시 00분
                </Text>
              </Group>
              <Group align="flex-start">
                <Stack gap={1}>
                  <Group gap={"xs"}>
                    <Text c={"gray.6"} fz={"xs"}>
                      응시인원
                    </Text>
                    <Text fz={"xs"}>8명</Text>
                  </Group>
                  <Group gap={"xs"}>
                    <Text c={"gray.6"} fz={"xs"}>
                      출석인원
                    </Text>
                    <Text fz={"xs"}>3명</Text>
                  </Group>
                </Stack>
                <Stack gap={1}>
                  <Group gap={"xs"}>
                    <Text c={"gray.6"} fz={"xs"}>
                      감독관
                    </Text>
                    <Text fz={"xs"}>김다은</Text>
                  </Group>
                  <Group gap={"xs"}>
                    <Text c={"gray.6"} fz={"xs"}>
                      ACG담당자
                    </Text>
                    <Text fz={"xs"}>김낙균</Text>
                  </Group>
                  <Group gap={"xs"}>
                    <Text c={"gray.6"} fz={"xs"}>
                      HR 담당자
                    </Text>
                    <Text fz={"xs"}>이솔</Text>
                  </Group>
                </Stack>
              </Group>
            </Stack>
          </Paper>
        </Collapse>
      </Stack>

      <Modal opened={openedAddRow} onClose={addRowClose} title="시행정보 추가" centered>
        <Stack>
          <Stack gap={1}>
            <Text fz={"sm"}>회사정보</Text>
            <Grid>
              <Grid.Col span={4}>
                <Select
                  label="그룹"
                  size="xs"
                  data={["LG", "SK", "ACG"]}
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
                />
              </Grid.Col>
              <Grid.Col span={8}>
                <TextInput size="xs" label="회사" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
              </Grid.Col>
            </Grid>
          </Stack>

          <Stack gap={1}>
            <Text fz={"sm"}>검사정보</Text>
            <Grid>
              <Grid.Col span={6}>
                <Select
                  label="검사"
                  size="xs"
                  data={["인적성", "인성", "적성", "기타"]}
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Select
                  label="구분"
                  size="xs"
                  data={["온라인", "오프라인"]}
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
                />
              </Grid.Col>
            </Grid>
          </Stack>

          <Grid>
            <Grid.Col span={6}>
              <TextInput size="xs" label="시간" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput size="xs" label="장소" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={6}>
              <NumberInput
                size="xs"
                label="응시인원"
                min={0}
                hideControls
                rightSection={
                  <Text mr={"lg"} fz={"xs"}>
                    명
                  </Text>
                }
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <NumberInput
                size="xs"
                label="출석인원"
                min={0}
                hideControls
                rightSection={
                  <Text mr={"lg"} fz={"xs"}>
                    명
                  </Text>
                }
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              />
            </Grid.Col>
          </Grid>

          <Stack gap={1}>
            <Text fz={"sm"}>인원정보</Text>
            <Stack>
              <TextInput
                size="xs"
                label="감독관"
                placeholder="알바"
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              />
              <Select
                label="ACG 담당자"
                size="xs"
                data={["김정훈", "안정현"]}
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              />
              <TextInput
                placeholder="이름/연락처"
                size="xs"
                label="HR 담당자"
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }}
              />
            </Stack>
          </Stack>
          <Group wrap="nowrap" mt={"md"}>
            <Button fullWidth size="xs" variant="light">
              추가하기
            </Button>
            <Button fullWidth size="xs" variant="light" color="gray" onClick={addRowClose}>
              닫기
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Modal>
  );
};

export default CreateDrawer;
