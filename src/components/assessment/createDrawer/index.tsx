import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  FileButton,
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

import { IconTrash, IconPlus } from "@tabler/icons-react";
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
            <Radio size="xs" value="svelte2" label="교육운영" />
            <Radio size="xs" value="sve3lte2" label="면접운영" />
          </Group>
        </Radio.Group>

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

        {/* <EditableTable /> */}
        <Button size="xs" variant="light" onClick={addRowOpen}>
          추가(모바일전용버튼)
        </Button>
        <Paper bg="gray.1" p="xs">
          <Group gap={"xs"}>
            <TextInput size="xs" label="그룹" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            <TextInput size="xs" label="회사" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            <TextInput size="xs" label="검사" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            <TextInput size="xs" label="구분" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            <TextInput size="xs" label="시간" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
            <TextInput size="xs" label="장소" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
          </Group>
        </Paper>
      </Stack>

      <Modal opened={openedAddRow} onClose={addRowClose} title="시행정보 추가" centered>
        <TextInput size="xs" label="그룹" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="회사" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="검사" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="구분" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="시간" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="장소" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="응시인원" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="출석인원" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="감독관" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="ACG담당자" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <TextInput size="xs" label="HR담당자" styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-5)" } }} />
        <Group wrap="nowrap" mt={"md"}>
          <Button fullWidth size="xs" variant="light">
            추가하기
          </Button>
          <Button fullWidth size="xs" variant="light" color="gray" onClick={addRowClose}>
            닫기
          </Button>
        </Group>
      </Modal>
    </Modal>
  );
};

export default CreateDrawer;
