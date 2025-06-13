"use client";
import { getNotices } from "@/app/api/get/getApi";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Badge, Group, List, ListItem, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import styles from "../../../styles/list.module.css";
import Link from "next/link";
const NoticeList = ({ params }: any) => {
  const { data } = useSuspenseQuery({
    queryKey: ["notices", params],
    queryFn: () => getNotices(params).then((res) => res.data),
  });

  const ListWrapper = ({ result }: any) => {
    return (
      <>
        {result.length < 1 ? (
          <Text ta={"center"} fz={"xs"} c={"gray"} py={"xl"}>
            내용이 없습니다.
          </Text>
        ) : (
          <List spacing={0} size="sm" center>
            {result?.map((record: TNotice, index: number, arr: any) => {
              return (
                <React.Fragment key={index}>
                  <Items key={record.noticeIdx} record={record} />
                </React.Fragment>
              );
            })}
          </List>
        )}
      </>
    );
  };

  const Items = ({ record }: { record: TNotice }) => (
    <Link href={`/notice/${record.noticeIdx}`} key={record.noticeIdx}>
      <ListItem w={"100%"} key={record.noticeIdx} className={styles.element} px={"sm"} py={"md"}>
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
    </Link>
  );

  return <ListWrapper result={data?.data?.result} />;
};

export default NoticeList;
