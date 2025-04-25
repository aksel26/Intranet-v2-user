import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Group, List, ListItem, Loader, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "../../../../styles/list.module.css";
import LoadingView from "@/components/Global/view/LoadingView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import EmptyView from "@/components/Global/view/EmptyView";
const LIST_LIMIT = 4;

function Notice() {
  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { notices, isLoading, isError } = useGetNotices({ params });

  const router = useRouter();
  const goDetail = (id: number) => {
    router.push(`/notice/${id}`);
  };

  const NoticeList = () => (
    <List spacing={0} size="sm" center>
      {notices?.map((record: TNotice, index: number) => (
        <NoticeItem key={index} notice={record} index={index} />
      ))}
    </List>
  );

  const NoticeItem = ({ notice, index }: { notice: TNotice; index: number }) => (
    <React.Fragment key={notice.noticeIdx}>
      {index + 1 > LIST_LIMIT ? null : (
        <ListItem w={"100%"} onClick={() => goDetail(notice.noticeIdx)} key={notice.noticeIdx} className={styles.element} px={"sm"} py={"xs"}>
          <Group justify="space-between">
            <Text fz={"xs"}>{notice.title}</Text>
            <Group>
              <Text c={"dimmed"} fz={"xs"}>
                {notice.creatorName}
              </Text>
              <Text c={"dimmed"} fz={"xs"}>
                {formatYYYYMMDD(notice.createdAt)}
              </Text>
            </Group>
          </Group>
        </ListItem>
      )}
    </React.Fragment>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>공지사항을 불러오는 중 오류가 발생했어요.</ErrorView>;
    if (notices?.length === 0) return <EmptyView />;
    return <NoticeList />;
  };
  return <>{renderContent()}</>;
}

export default Notice;
