"use client";
import { getNotices } from "@/app/api/get/getApi";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Badge, Group, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import styles from "../../../styles/list.module.css";
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
          result?.map((record: TNotice, index: number, arr: any) => {
            return (
              <React.Fragment key={index}>
                <Items key={record.noticeIdx} record={record} />
              </React.Fragment>
            );
          })
        )}
      </>
    );
  };

  const Items = ({ record }: { record: TNotice }) => (
    <Link href={`/notice/${record.noticeIdx}`} key={record.noticeIdx}>
      <Stack gap={2} className={styles.element}>
        <Group>
          <Text fz={"sm"}>{record.title}</Text>
          {record.isNew && (
            <Badge size="xs" variant="light">
              New
            </Badge>
          )}
        </Group>
        <Group>
          <Text c={"dimmed"} fz={"sm"}>
            {record.creatorName}
          </Text>
          <Text c={"dimmed"} fz={"sm"}>
            {formatYYYYMMDD(record.createdAt)}
          </Text>
        </Group>
      </Stack>
    </Link>
  );

  return (
    <Stack mt={"md"} gap={"lg"}>
      <ListWrapper result={data?.data?.result} />
    </Stack>
  );
};

export default NoticeList;
