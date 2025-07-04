import styles from "@/styles/list/list.module.css";
import { ActionIcon, Group, Indicator, List, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import { approvalService } from "@/api/services/approval/approval.service";
import EmptyView from "@/components/common/empty";
import type { TApprovalList } from "@/types/approval";
import { ChevronRight } from "lucide-react";
import { ApprovalType } from "../badge/ApprovalType";
import { ApprovalStatus } from "../badge/ApprovalStatus";
import ApprovalConfirm from "../confirm";
import { newService } from "@/api/services/new/new.services";

const ApprovalList = ({ params }: any) => {
  const { data, isLoading, isError } = useApiQuery(["approvals", params], () => approvalService.getApprovals(params));

  //   const { mutate } = useUpdateNew();

  const checkNew = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(newService.updateNew, {
    invalidateKeys: [["me"]],
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["approvals"] });
    },
    onError: (error: any) => {
      console.error("error:", error);
    },
  });

  const queryClient = useQueryClient();
  const [targetInfo, setTargetInfo] = useState();

  const [confirmModal, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);
  const modalOpen = async (record: any) => {
    setTargetInfo(record);
    openConfirmModal();

    checkNew.mutate(
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
          <Indicator disabled={record.isNew ? false : true} offset={-3} size={7} position="top-start" color="beige.5">
            <Group align="center">
              <Text fz={"sm"} fw={500}>
                {`${dayjs(record?.commuteDate).format("YYYY-MM-DD (dd)")}`}
              </Text>
              <ApprovalType value={record.relationType} />
            </Group>
          </Indicator>
          <ActionIcon variant="subtle" color="gray.4" size={"sm"}>
            <ChevronRight />
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
      {data?.data.data.length < 1 ? (
        <EmptyView />
      ) : (
        <List spacing={0} size="sm" center>
          {data?.data.data?.map((record: TApprovalList, index: number, arr: any) => {
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
