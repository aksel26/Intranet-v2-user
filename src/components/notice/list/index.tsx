import { getNotices } from "@/app/api/get/getApi";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Badge, Group, List, ListItem, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../../../styles/list.module.css";
const NoticeList = () => {
  const router = useRouter();
  const goDetail = async (id: number) => router.push(`/notice/${id}`);
  const ListWrapper = () => {
    return (
      <List spacing={0} size="sm" center>
        {data.data.data.result?.map((record: TNotice, index: number, arr: any) => {
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

  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  // const { notices, isLoading, isError } = useGetNotices({ params });
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["notices", params],
    queryFn: () => getNotices(params),
  });
  return <ListWrapper />;
};

export default NoticeList;
