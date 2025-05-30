"use client";
import * as api from "@/app/api/get/getApi";
import { ApprovalStatus, ApprovalType } from "@/components/Approval/badge";
import ApprovalConfirm from "@/components/Approval/confirm";
import UserSelect from "@/components/Approval/userSelect";
import PageContainer from "@/components/Global/container";
import YearSelect from "@/components/Global/dateSelect/YearSelect";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import MonthFilter from "@/components/ui/monthFilter";
import { TApprovalList } from "@/lib/types/approval";
import { TApproval } from "@/types/apiTypes";
import {
  ActionIcon,
  Box,
  Grid,
  Group,
  Indicator,
  List,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import React, { useState } from "react";
import styles from "../../../styles/list.module.css";

const page = () => {
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
    // month: (dayjs().month() + 1).toString(),
  });

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["approvals", params],
    queryFn: () => api.getApprovals(params),
  });
  const approvalsList = data?.data.data;
  console.log("🚀 ~ page ~ approvalsList:", approvalsList);

  const [targetInfo, setTargetInfo] = useState();

  const [confirmModal, { open: openConfirmModal, close: closeConfirmModal }] =
    useDisclosure(false);

  const modalOpen = async (record: any) => {
    setTargetInfo(record);
    openConfirmModal();
    await queryClient.invalidateQueries({ queryKey: ["approvals"] });
  };

  const ListWrapper = () => {
    return (
      <List spacing={0} size="sm" center>
        {approvalsList?.map(
          (record: TApprovalList, index: number, arr: any) => {
            return (
              <React.Fragment key={index}>
                <Items key={record.commuteIdx} record={record} />
              </React.Fragment>
            );
          }
        )}
      </List>
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
          <Indicator disabled={record.isNew ? false : true} offset={-5}>
            <Text fz={"sm"} fw={500}>
              {`${dayjs(record?.commuteDate).format("YYYY-MM-DD (dd)")}`}
            </Text>
          </Indicator>
          <ActionIcon variant="subtle" color="gray.4" size={"sm"}>
            <IconChevronRight />
          </ActionIcon>
        </Group>
        <Grid align="center">
          <Grid.Col span={{ base: 2, md: 0.7 }}>
            <Group justify="center">
              <ApprovalType value={record?.relationType} />
            </Group>
          </Grid.Col>
          <Grid.Col span={{ base: 10 }}>
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
          </Grid.Col>
        </Grid>
      </Stack>
    </List.Item>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError)
      return (
        <ErrorView>결재/승인 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>
      );
    if (approvalsList?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return (
    <PageContainer>
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

      <Group justify="space-between" align="center">
        <Group>
          <YearSelect w={150} setParams={setParams} />
          <UserSelect w={250} setParams={setParams} />
        </Group>
        <MonthFilter trigger={setParams} />
      </Group>
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        {renderContent()}
      </Paper>

      <ApprovalConfirm
        opened={confirmModal}
        close={closeConfirmModal}
        details={targetInfo}
      />
    </PageContainer>
  );
};

export default page;
