"use client";
import PageContainer from "@/components/Global/container";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Badge, Button, Group, List, ListItem, Paper, Stack, Text, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import styles from "../../../styles/list.module.css";
const Notice = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { notices, isLoading, isError } = useGetNotices({ params });

  const goDetail = async (id: number) => router.push(`${pathName}/${id}`);
  const searchRef = useRef<HTMLInputElement>(null);
  const search = (e: any) => {
    if (e.key === "Enter" || e.key === "NumpadEnter" || e.type === "click") {
      if (searchRef.current) {
        const value = searchRef.current.value || "";
        setParams((prev: any) => ({ ...prev, searchWord: value }));
      }
    }
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
        <Group>
          <Text fz={"xs"}>{record.title}</Text>
          {record.isNew && (
            <Badge size="xs" variant="light">
              New
            </Badge>
          )}
        </Group>
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
    <PageContainer>
      <Stack gap={1} mb="xs">
        <Text size="lg" fw={600}>
          공지사항
        </Text>
        <Text c={"gray.6"} fz={"sm"}>
          공지사항 등록은 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Stack>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        <Stack gap={"xs"}>
          <Group>
            <TextInput onKeyUp={(e) => search(e)} ref={searchRef} placeholder="제목 또는 내용을 입력하세요." w={400} leftSection={<IconSearch size={18} />} />
            <Button onClick={search} onKeyUp={(e) => search(e)} variant="light">
              검색
            </Button>
          </Group>
          {/* <Search /> */}
          {renderContent()}
        </Stack>
      </Paper>
    </PageContainer>
  );
};

export default Notice;
