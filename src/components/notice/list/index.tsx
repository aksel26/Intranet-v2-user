import { noticeService } from "@/api/services/notice/notice.services";
import { useApiQuery } from "@/api/useApi";
import type { TNotice } from "@/types/notice";
import { formatYYYYMMDD } from "@/utils/date/format";
import { Badge, Group, Stack, Text } from "@mantine/core";
import React from "react";
import styles from "@/styles/list/list.module.css";
import { useNavigate } from "react-router-dom";
import NoticeCategory from "../category";

const NoticeList = ({ params }: any) => {
  const { data, isLoading, isError } = useApiQuery(["notices", params], () => noticeService.getNotices(params));

  const navigate = useNavigate();

  const goDetail = (notice: TNotice) => navigate(`/notice/${notice.noticeIdx}`);

  const ListWrapper = ({ result }: any) => {
    return (
      <>
        {result.length < 1 ? (
          <Text ta={"center"} fz={"xs"} c={"gray"} py={"xl"}>
            내용이 없습니다.
          </Text>
        ) : (
          result?.map((record: TNotice, index: number) => {
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
    <Stack gap={5} className={styles.element} key={record.noticeIdx} onClick={() => goDetail(record)}>
      <Group>
        <Text fz={"sm"}>{record.title}</Text>
        {record.isNew && (
          <Badge size="xs" variant="light">
            New
          </Badge>
        )}
      </Group>
      <Group>
        <NoticeCategory record={record} />
        <Text c={"gray"} fz={"sm"}>
          {record.creatorName}
        </Text>
        <Text c={"gray"} fz={"sm"}>
          {formatYYYYMMDD(record.createdAt)}
        </Text>
      </Group>
    </Stack>
  );

  return (
    <Stack mt={"md"} gap={"lg"}>
      {isLoading ? <Text ta={"center"}>Loading...</Text> : <ListWrapper result={data?.data?.data.result} />}
    </Stack>
  );
};

export default NoticeList;
