import { Box, Group, Indicator, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import styles from "@/styles/list/list.module.css";
import EmptyView from "@/components/common/empty";
import { ErrorView } from "@/components/common/error";
import LoadingView from "@/components/loading";
import { formatYYYYMMDD } from "@/utils/date/format";
import { useNavigate } from "react-router-dom";
import { useApiQuery } from "@/api/useApi";
import { noticeService } from "@/api/services/notice/notice.services";
import type { TNotice } from "@/types/notice";
const LIST_LIMIT = 4;

function Notice() {
  const [params] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { data, isLoading, isError } = useApiQuery(["notices", params], () => noticeService.getNotices(params));

  const notices = data?.data.data.result;
  console.log("notices: ", notices);

  //   const { notices, isLoading, isError } = useGetNotices({ params });

  const NoticeList = () => notices?.map((record: TNotice, index: number) => <NoticeItem key={index} notice={record} index={index} />);

  const navigate = useNavigate();

  const goDetail = (notice: any) => {
    navigate(`/notice/${notice.noticeIdx}`);
  };

  const NoticeItem = ({ notice, index }: { notice: TNotice; index: number }) => (
    <React.Fragment key={notice.noticeIdx}>
      {index + 1 > LIST_LIMIT ? null : (
        <Box className={styles.element} onClick={() => goDetail(notice)} key={notice.noticeIdx}>
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
