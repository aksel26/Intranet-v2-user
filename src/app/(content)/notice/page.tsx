"use client";
import { Container, Group, Pagination, Table, Text } from "@mantine/core";

const elements = Array.from({ length: 15 }, (_, index) => {
  return { position: index + 1, title: "제목1", writer: "작성지2", createdAt: "2024-10-11" };
});

const Notice = () => {
  const rows = elements.map((element: any, index: number) => (
    <Table.Tr key={index + 1}>
      <Table.Td>{index + 1}</Table.Td>
      <Table.Td>{element.title}</Table.Td>
      <Table.Td>{element.writer}</Table.Td>
      <Table.Td>{element.createdAt}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Container size={"lg"} py={"md"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      {/* <Flex direction={"column"} pt={"lg"} p={"sm"}> */}
      <Text size="xl" fw={700}>
        공지사항
      </Text>

      <Table my={"md"} highlightOnHover withRowBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>No.</Table.Th>
            <Table.Th>제목</Table.Th>
            <Table.Th>작성자</Table.Th>
            <Table.Th>작성일</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Group justify="center">
        <Pagination total={10} />
      </Group>

      {/* </Flex> */}
    </Container>
  );
};

export default Notice;
