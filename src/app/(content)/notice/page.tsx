"use client";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import Search from "@/components/notice/search";
import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Breadcrumbs, Container, Group, List, ListItem, Paper, Stack, Text } from "@mantine/core";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
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

  const ListWrapper = () => {
    return (
      <List spacing={0} size="sm" center>
        {notices?.map((record: TNotice, index: number, arr: any) => {
          return (
            <React.Fragment key={index}>
              <Items key={record.noticeIdx} record={record} />
            </React.Fragment>
          );
        })}
      </List>
    );
  };

  const Items = ({ record }: { record: TNotice }) => (
    <ListItem w={"100%"} onClick={() => goDetail(record.noticeIdx)} key={record.noticeIdx} className={styles.element} px={"sm"} py={"md"}>
      <Stack gap={4}>
        <Text fz={"xs"}>{record.title}</Text>
        <Group>
          <Text c={"dimmed"} fz={"xs"}>
            {record.creatorName}
          </Text>
          <Text c={"dimmed"} fz={"xs"}>
            {formatYYYYMMDD(record.createdAt)}
          </Text>
        </Group>
      </Stack>
    </ListItem>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>공지사항 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (notices?.length === 0) return <EmptyView />;
    return <ListWrapper />;
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
      <Group justify="space-between" align="center" mb={"md"}>
        <Breadcrumbs>{items}</Breadcrumbs>
        <Text c={"gray.8"} fz={"xs"} ta={"right"}>
          공지사항 등록은 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Group>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        <Stack gap={"xs"}>
          <Search />
          {renderContent()}
        </Stack>
      </Paper>
    </Container>
  );
};

export default Notice;
