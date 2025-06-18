import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Group, Indicator, List, ListItem, Loader, Text } from "@mantine/core";
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
  console.log("notices:", notices);

  const router = useRouter();
  const goDetail = (id: number) => {
    router.push(`/notice/${id}`);
  };

  const NoticeList = () => (
    <List spacing={0} size="sm" center styles={{ itemWrapper: { width: "100%" } }}>
      {notices?.map((record: TNotice, index: number) => (
        <NoticeItem key={index} notice={record} index={index} />
      ))}
    </List>
  );

  const NoticeItem = ({ notice, index }: { notice: TNotice; index: number }) => (
    <React.Fragment key={notice.noticeIdx}>
      {index + 1 > LIST_LIMIT ? null : (
        <ListItem w={"100%"} onClick={() => goDetail(notice.noticeIdx)} key={notice.noticeIdx} className={styles.element} px={"sm"} py={4} styles={{ itemLabel: { width: "100%" } }}>
          <Indicator offset={-14} disabled={notice.isNew ? false : true} position="middle-end">
            <Group justify="space-between" w={"100%"}>
              <Text fz={"sm"}>{notice.title}</Text>
              <Group gap={"xs"}>
                <Text c={"dimmed"} fz={"sm"}>
                  {notice.creatorName}
                </Text>
                <Text c={"dimmed"} fz={"sm"} w={80} ta={"right"}>
                  {formatYYYYMMDD(notice.createdAt)}
                </Text>
              </Group>
            </Group>
          </Indicator>
        </ListItem>
      )}
    </React.Fragment>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>공지/일정을 불러오는 중 오류가 발생했어요.</ErrorView>;
    if (notices?.length === 0) return <EmptyView />;
    return <NoticeList />;
  };
  return <>{renderContent()}</>;
}

export default Notice;
