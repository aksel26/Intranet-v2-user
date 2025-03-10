import useGetNotices from "@/hooks/useGetNotices";
import { TNotice } from "@/lib/types/notice";
import { Divider, Group, List, ListItem, Loader, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import styles from "../../../styles/list.module.css";
import { formatYYYYMMDD } from "@/utils/dateFomat";
import { useRouter } from "next/navigation";
function DashboardNotice() {
  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  const { notices, isLoading, isError } = useGetNotices({ params });

  const LIST_LIMIT = 4;
  const router = useRouter();
  const goDetail = (id: number) => {
    router.push(`/notice/${id}`);
  };
  return (
    <List
      spacing={0}
      size="xs"
      center
      styles={{
        itemLabel: { width: "100%" },
        itemWrapper: { width: "100%" },
      }}
    >
      {isLoading ? (
        <Loader color="blue" />
      ) : (
        notices?.map((notice: TNotice, index: number, arr: any) => (
          <React.Fragment key={notice.noticeIdx}>
            {
              index + 1 > LIST_LIMIT ? null : (
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
              )
              // {arr.length === index + 1 ? null : <Divider />}
            }
          </React.Fragment>
        ))
      )}
    </List>
  );
}

export default DashboardNotice;
