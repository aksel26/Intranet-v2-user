"use client";
import * as api from "@/app/api/get/getApi";
import { ApprovalStatus, ApprovalType } from "@/components/Approval/badge";
import ApprovalConfirm from "@/components/Approval/confirm";
import UserSelect from "@/components/Approval/userSelect";
import MonthSelect from "@/components/Global/dateSelect/MonthSelect";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import EmptyView from "@/components/Global/view/EmptyView";
import ErrorView from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { TApprovalList } from "@/lib/types/approval";
import { TApproval } from "@/types/apiTypes";
import { ActionIcon, Container, Group, List, ListItem, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import styles from "../../../styles/list.module.css";

const page = () => {
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["approvals", params],
    queryFn: () => api.getApprovals(params),
  });
  const approvalsList = data?.data.data;
  console.log("🚀 ~ page ~ approvalsList:", approvalsList);

  const [targetInfo, setTargetInfo] = useState();

  const [confirmModal, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);

  const modalOpen = (record: any) => {
    setTargetInfo(record);
    openConfirmModal();
  };

  const ListWrapper = () => {
    return (
      <List spacing={0} size="sm" center>
        {approvalsList?.map((record: TApprovalList, index: number, arr: any) => {
          return (
            <React.Fragment key={index}>
              <Items key={record.commuteIdx} record={record} />
            </React.Fragment>
          );
        })}
      </List>
    );
  };
  const Items = ({ record }: { record: TApprovalList }) => (
    <ListItem w={"100%"} onClick={() => modalOpen(record)} key={record?.commuteIdx} className={styles.element} px={"sm"} py={"xl"}>
      <Stack gap={8}>
        <Text fz={"sm"} fw={600}>
          {`${dayjs(record?.commuteDate).format("YYYY-MM-DD (dd)")}`}
        </Text>
        <Group gap={"xl"} align="end">
          <Stack gap={2}>
            <Text fz={"xs"} c={"dimmed"}>
              결재유형
            </Text>
            <ApprovalType value={record?.relationType} />
          </Stack>
          <Stack gap={2}>
            <Text fz={"xs"} c={"dimmed"}>
              성명
            </Text>
            <Text fz={"xs"}>{record?.userName}</Text>
          </Stack>
          <Stack gap={2}>
            <Text fz={"xs"} c={"dimmed"}>
              휴가유형
            </Text>
            <Text fz={"xs"}>{record?.leaveType}</Text>
          </Stack>
          <Stack gap={2}>
            <Text fz={"xs"} c={"dimmed"}>
              상태
            </Text>
            <ApprovalStatus record={record} />
          </Stack>

          <Text c={record?.note ? "black" : "dimmed"} fz={"xs"}>
            {record?.note || "작성 내용이 없습니다."}
          </Text>
          <ActionIcon variant="subtle" color="gray.4" size={"sm"}>
            <IconChevronRight />
          </ActionIcon>
          {/* <ButtonByApprovalStatus setTargetInfo={setTargetInfo} record={record} open={openConfirmModal} /> */}
        </Group>
      </Stack>
    </ListItem>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>결재/승인 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (approvalsList?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return (
    <Container
      fluid
      p={"lg"}
      style={{
        scrollPaddingBottom: "52px",
        overflowY: "auto",
        scrollSnapType: "y mandatory",
      }}
    >
      <Stack gap={1}>
        <Text size="lg" fw={600} component="a">
          결재 및 승인{" "}
          <Text component="span" fz={"sm"} c={"dimmed"} ml={"sm"}>
            {approvalsList?.length}건
          </Text>
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          결재 및 승인 요청 내역이 보여지며, 참조 내역도 확인할 수 있습니다.
        </Text>
      </Stack>

      <Group align="end">
        <YearSelect w={150} setParams={setParams} />
        <MonthSelect w={100} setParams={setParams} />
        <UserSelect w={250} setParams={setParams} />
      </Group>
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        {renderContent()}
      </Paper>

      <ApprovalConfirm opened={confirmModal} close={closeConfirmModal} details={targetInfo} />
    </Container>
  );
};

export default page;
