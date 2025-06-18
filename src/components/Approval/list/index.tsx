import { getApprovals } from "@/app/api/get/getApi";
import EmptyView from "@/components/Global/view/EmptyView";
import { useUpdateNew } from "@/hooks/useSubmitForm";
import { TApprovalList } from "@/lib/types/approval";
import styles from "@/styles/list.module.css";
import { ActionIcon, Group, Indicator, List, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import { ApprovalStatus } from "../badge";
import ApprovalConfirm from "../confirm";
import { ApprovalType } from "../type";

const ApprovalList = ({ params }: any) => {
  const data = useSuspenseQuery({
    queryKey: ["approvals", params],
    queryFn: () => getApprovals(params).then((res) => res.data),
  });
  const { mutate } = useUpdateNew();
  const queryClient = useQueryClient();
  const [targetInfo, setTargetInfo] = useState();

  const [confirmModal, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);
  const modalOpen = async (record: any) => {
    setTargetInfo(record);
    openConfirmModal();

    mutate(
      {
        commuteIdx: record.commuteIdx,
        body: {
          lastCheckedAt: dayjs().toISOString(),
          relationType: record.relationType,
        },
      },
      {
        onSuccess: async (res) => {
          await queryClient.invalidateQueries({ queryKey: ["approvals"] });
        },
        onError: (error: Error) => {
          console.error("error:", error);
          // notification({title:"hi", color:"red", message:""})
        },
      }
    );
  };

  const Items = ({ record }: { record: TApprovalList }) => (
    <List.Item
      w={"100%"}
      onClick={() => modalOpen(record)}
      key={record?.commuteIdx}
      className={styles.element}
      py={"md"}
      styles={{
        item: { width: "100%" },
        itemLabel: { width: "100%" },
        itemWrapper: { width: "100%" },
      }}
    >
      <Stack gap={8} w={"100%"}>
        <Group justify="space-between" align="center" wrap="nowrap" w={"100%"}>
          <Indicator disabled={record.isNew ? false : true} offset={-3} size={7} position="top-start">
            <Group align="center">
              <Text fz={"sm"} fw={500}>
                {`${dayjs(record?.commuteDate).format("YYYY-MM-DD (dd)")}`}
              </Text>
              <ApprovalType value={record.relationType} />
            </Group>
          </Indicator>
          <ActionIcon variant="subtle" color="gray.4" size={"sm"}>
            <IconChevronRight />
          </ActionIcon>
        </Group>
        <Stack gap={6}>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              성명
            </Text>
            <Text fz={"xs"}>{record?.userName}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              휴가유형
            </Text>
            <Text fz={"xs"}>{record?.leaveType}</Text>
          </Group>
          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              상태
            </Text>
            <ApprovalStatus record={record} />
          </Group>

          <Group gap={"xs"}>
            <Text fz={"xs"} c={"dimmed"} w={50}>
              내용
            </Text>
            <Text c={record?.note ? "black" : "dimmed"} fz={"xs"}>
              {record?.note || "작성 내용이 없습니다."}
            </Text>
          </Group>
        </Stack>
      </Stack>
    </List.Item>
  );
  return (
    <>
      {data.data.data.length < 1 ? (
        <EmptyView />
      ) : (
        <List spacing={0} size="sm" center>
          {data.data.data?.map((record: TApprovalList, index: number, arr: any) => {
            return (
              <React.Fragment key={index}>
                <Items key={record.commuteIdx} record={record} />
              </React.Fragment>
            );
          })}
        </List>
      )}
      <ApprovalConfirm opened={confirmModal} close={closeConfirmModal} details={targetInfo} />
    </>
  );
};

export default ApprovalList;
