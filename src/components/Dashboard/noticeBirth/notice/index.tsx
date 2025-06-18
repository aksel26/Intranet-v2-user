import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { Box, Group, Indicator, Stack, Text } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../../../../styles/list.module.css";
const LIST_LIMIT = 4;

function Notice() {
  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { notices, isLoading, isError } = useGetNotices({ params });

  const NoticeList = () => notices?.map((record: TNotice, index: number) => <NoticeItem key={index} notice={record} index={index} />);

  const NoticeItem = ({ notice, index }: { notice: TNotice; index: number }) => (
    <React.Fragment key={notice.noticeIdx}>
      {index + 1 > LIST_LIMIT ? null : (
        <Link href={`/notice/${notice.noticeIdx}`} key={notice.noticeIdx}>
          <Box className={styles.element}>
            <Indicator offset={-14} disabled={notice.isNew ? false : true} size={7} position="middle-end">
              <Group justify="space-between" w={"100%"}>
                <Text fz={"sm"}>{notice.title}</Text>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    {notice.creatorName}
                  </Text>
                  <Text c={"dimmed"} fz={"xs"} w={80} ta={"right"}>
                    {formatYYYYMMDD(notice.createdAt)}
                  </Text>
                </Group>
              </Group>
            </Indicator>
          </Box>
        </Link>
      )}
    </React.Fragment>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>공지/일정을 불러오는 중 오류가 발생했어요.</ErrorView>;
    if (notices?.length === 0) return <EmptyView />;
    return (
      <Stack px={"md"} pt={"xs"} gap={8}>
        <NoticeList />
      </Stack>
    );
  };
  return <>{renderContent()}</>;
}

export default Notice;
