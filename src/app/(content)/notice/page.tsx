"use client";
import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Box, Breadcrumbs, Container, Divider, Group, List, ListItem, Loader, Paper, Stack, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "../../../styles/list.module.css";
const Notice = () => {
  const router = useRouter();
  const pathName = usePathname();
  const items = [{ title: "공지사항", href: "#" }].map((item, index) => (
    <Text size="lg" fw={600} component="a" key={index}>
      {item.title}
    </Text>
  ));

  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { notices, isLoading, isError } = useGetNotices({ params });

  const goDetail = (id: number) => {
    router.push(`${pathName}/${id}`);
  };

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
      {/* <Flex direction={"column"} pt={"lg"} p={"sm"}> */}
      <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        <Text c={"dimmed"} fz={"xs"} ta={"right"}>
          공지사항 등록은 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
        <List
          w={"100%"}
          spacing={0}
          size="xs"
          center
          styles={{
            itemLabel: { width: "100%" },
            itemWrapper: { width: "100%" },
          }}
        >
          {isLoading ? (
            <Loader color="blue" />
          ) : (
            notices?.map((notice: TNotice, index: number, arr: any) => (
              <>
                <ListItem w={"100%"} onClick={() => goDetail(notice.noticeIdx)} key={notice.noticeIdx} className={styles.element} px={"sm"} py={"md"}>
                  <Stack gap={4}>
                    <Text fz={"xs"}>{notice.title}</Text>
                    <Group>
                      <Text c={"dimmed"} fz={"xs"}>
                        {notice.creatorName}
                      </Text>
                      <Text c={"dimmed"} fz={"xs"}>
                        {formatYYYYMMDD(notice.createdAt)}
                      </Text>
                    </Group>
                  </Stack>
                </ListItem>
                {arr.length === index + 1 ? null : <Divider />}
              </>
            ))
          )}
        </List>
      </Paper>

      {/* </Flex> */}
    </Container>
  );
};

export default Notice;
