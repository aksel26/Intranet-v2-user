"use client";
import { Box, Breadcrumbs, Container, Divider, Group, List, ListItem, Pagination, Paper, Table, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";

const elements = Array.from({ length: 15 }, (_, index) => {
  return { position: index + 1, title: "제목1", writer: "작성지2", createdAt: "2024-10-11" };
});

const Notice = () => {
  const items = [{ title: "공지사항", href: "#" }].map((item, index) => (
    <Text size="lg" fw={700} component="a" key={index}>
      {item.title}
    </Text>
  ));

  const router = useRouter();
  const pathName = usePathname();
  const goDetail = (id: number) => {
    router.push(`${pathName}/${id}`);
  };
  return (
    <Container fluid p={"lg"} style={{ scrollPaddingBottom: "52px", overflowY: "auto", scrollSnapType: "y mandatory" }}>
      {/* <Flex direction={"column"} pt={"lg"} p={"sm"}> */}
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        <Text c={"dimmed"} fz={"sm"}>
          공지사항 등록은 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
        <Divider my={"md"} />
        <List w={"100%"} spacing="xs" size="sm" center styles={{ itemLabel: { width: "100%" }, itemWrapper: { width: "100%" } }}>
          <ListItem w={"100%"} onClick={() => goDetail(2)}>
            <Group justify="space-between">
              <Box>
                <Group>
                  <Text fz={"xs"}>1</Text>
                  <Text fz={"xs"}>ACG Monthly Meeting</Text>
                </Group>
              </Box>
              <Group>
                <Text c={"dimmed"} fz={"xs"}>
                  안지훈
                </Text>
                <Text c={"dimmed"} fz={"xs"}>
                  2024-12-12
                </Text>
              </Group>
            </Group>
          </ListItem>
          <ListItem w={"100%"}>
            <Group justify="space-between">
              <Box>
                <Group>
                  <Text fz={"xs"}>2</Text>
                  <Text fz={"xs"}>ACG Monthly Meeting</Text>
                </Group>
              </Box>
              <Group>
                <Text c={"dimmed"} fz={"xs"}>
                  안지훈
                </Text>
                <Text c={"dimmed"} fz={"xs"}>
                  2024-12-12
                </Text>
              </Group>
            </Group>
          </ListItem>
          <ListItem w={"100%"}>
            <Group justify="space-between">
              <Box>
                <Group>
                  <Text fz={"xs"}>3</Text>
                  <Text fz={"xs"}>ACG Monthly Meeting</Text>
                </Group>
              </Box>
              <Group>
                <Text c={"dimmed"} fz={"xs"}>
                  안지훈
                </Text>
                <Text c={"dimmed"} fz={"xs"}>
                  2024-12-12
                </Text>
              </Group>
            </Group>
          </ListItem>
        </List>
      </Paper>

      {/* </Flex> */}
    </Container>
  );
};

export default Notice;
