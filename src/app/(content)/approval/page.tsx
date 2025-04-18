"use client";
import * as api from "@/app/api/get/getApi";
import ApprovalConfirm from "@/components/Approval/confirm";
import FetchWrapper from "@/components/fetchWrapper";
import { RELATION_TYPE } from "@/lib/enums";
import { TApproval } from "@/types/apiTypes";
import { monthList, yearsList } from "@/utils/dateFomat";
import { ActionIcon, Badge, Button, Container, Group, List, ListItem, Paper, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "../../../styles/list.module.css";
const ApprovalType = ({ children }: { children: keyof typeof RELATION_TYPE }) => {
  return (
    <Badge miw={70} color={children === "APPROVER" ? "orange.5" : "yellow.5"} radius="sm" size="md" variant="light">
      {RELATION_TYPE[children]}
    </Badge>
  );
};
const ApprovalStatus = ({ record }: { record: any }) => {
  const { confirmYN, confirmDate, rejectDate } = record;
  if (confirmYN === "Y") {
    return (
      <Text fz={"xs"} c={"green.5"} miw={60}>
        승인완료
        <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
          ({confirmDate})
        </Text>
      </Text>
    );
  } else if (confirmYN === "N") {
    if (!rejectDate) {
      return (
        <Text fz={"xs"} c={"yellow.5"} miw={60}>
          승인 대기
        </Text>
      );
    } else {
      return (
        <Text fz={"xs"} c={"red.4"} miw={60}>
          반려
          <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
            ({rejectDate})
          </Text>
        </Text>
      );
    }
  }
};

const page = () => {
  const [monthValue, setMonthValue] = useState<string | null>((dayjs().month() + 1).toString());
  const [yearValue, setYearValue] = useState<string | null>(dayjs().year().toString());
  const [userValue, setUserValue] = useState<string | null>();
  const [isActive, setIsActive] = useState({
    yearSelect: false,
    monthSelect: false,
    userSelect: false,
  });

  const [confirmList, setConfirmList] = useState([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
    userIdx: Number(userValue) || null,
  });
  const {
    data: approvals,
    isLoading: approvals_isLoading,
    isError: approvals_isError,
  } = useQuery({
    queryKey: ["approvals", params],
    queryFn: () => api.getApprovals(params),
  });
  const approvalsList = approvals?.data.data;
  console.log("🚀 ~ page ~ approvalsList:", approvalsList);
  console.log("🚀 ~ page ~ approvals:", approvals);
  const selectMonth = (e: any) => {
    setParams((params) => ({ ...params, month: e }));
    setMonthValue(e);
    setIsActive((prev) => ({ ...prev, monthSelect: false }));
  };
  const selectYear = (e: any) => {
    setParams((params) => ({ ...params, year: e }));
    setYearValue(e);
    setIsActive((prev) => ({ ...prev, yearSelect: false }));
  };
  const selectUser = (e: any) => {
    console.log("🚀 ~ selectUser ~ e:", e);
    setParams((params) => ({ ...params, userIdx: Number(e) }));
    setUserValue(e);
    setIsActive((prev) => ({ ...prev, userSelect: false }));
  };

  const [confirmPerson, setConfirmPerson] = useState<string[]>();
  const selectConfirm = (data: any) => setConfirmPerson(data);
  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);

  const [targetInfo, setTargetInfo] = useState();

  const [confirmModal, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure(false);

  const modalOpen = (record: any) => {
    setTargetInfo(record);
    openConfirmModal();
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

      <Group align="end" mb={"xs"}>
        <Select
          mt={"md"}
          w={130}
          comboboxProps={{
            withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
            transitionProps: { transition: "pop", duration: 200 },
          }}
          onChange={selectYear}
          value={yearValue}
          data={yearsList().map((item) => ({ value: item.toString(), label: `${item}년` }))}
          styles={{
            root: { width: "max-content" },
            input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-md)", fontWeight: 600 },
          }}
          dropdownOpened={isActive.yearSelect}
          onBlur={() => setIsActive((prev) => ({ ...prev, yearSelect: false }))}
          onClick={() => {
            setIsActive((prev) => ({ ...prev, yearSelect: true }));
          }}
        />

        <Select
          mt={"lg"}
          w={100}
          comboboxProps={{
            withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
            transitionProps: { transition: "pop", duration: 200 },
          }}
          onChange={selectMonth}
          value={monthValue}
          data={monthList().map((item) => ({ value: item.toString(), label: `${item}월` }))}
          styles={{
            root: { width: "max-content" },
            input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-md)", fontWeight: 600 },
          }}
          dropdownOpened={isActive.monthSelect}
          onBlur={() => setIsActive((prev) => ({ ...prev, monthSelect: false }))}
          onClick={() => {
            setIsActive((prev) => ({ ...prev, monthSelect: true }));
          }}
        />

        <Select
          mt={"lg"}
          w={280}
          comboboxProps={{
            withinPortal: false, // 포털 비활성화로 외부 클릭 감지 개선
            // onDropdownClose: () => console.log("Dropdown closed"), // 닫힘 시 로깅
            transitionProps: { transition: "pop", duration: 200 },
          }}
          onChange={selectUser}
          value={userValue}
          data={confirmList?.map((user: any) => ({ value: user.userIdx + "", label: user.userName }))}
          styles={{
            root: { width: "max-content" },
            input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-md)", fontWeight: 600 },
          }}
          placeholder="승인 대상자를 선택해 주세요."
          dropdownOpened={isActive.userSelect}
          onBlur={() => setIsActive((prev) => ({ ...prev, userSelect: false }))}
          onClick={() => {
            setIsActive((prev) => ({ ...prev, userSelect: true }));
          }}
        />
      </Group>
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        <Stack gap={"xl"}>
          <FetchWrapper data={approvalsList} isLoading={approvals_isLoading}>
            <List spacing={0} size="sm" center>
              {approvalsList?.map((record: any, index: number, arr: any) => {
                return (
                  <ListItem w={"100%"} onClick={() => modalOpen(record)} key={record.commuteIdx} className={styles.element} px={"sm"} py={"xl"}>
                    <Stack gap={8}>
                      <Text fz={"sm"} fw={600}>
                        {`${dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}`}
                      </Text>
                      <Group gap={"xl"} align="end">
                        <Stack gap={2}>
                          <Text fz={"xs"} c={"dimmed"}>
                            결재유형
                          </Text>
                          <ApprovalType>{record.relationType}</ApprovalType>
                        </Stack>
                        <Stack gap={2}>
                          <Text fz={"xs"} c={"dimmed"}>
                            성명
                          </Text>
                          <Text fz={"xs"}>{record.userName}</Text>
                        </Stack>
                        <Stack gap={2}>
                          <Text fz={"xs"} c={"dimmed"}>
                            휴가유형
                          </Text>
                          <Text fz={"xs"}>{record.leaveType}</Text>
                        </Stack>
                        <Stack gap={2}>
                          <Text fz={"xs"} c={"dimmed"}>
                            상태
                          </Text>
                          <ApprovalStatus record={record} />
                        </Stack>

                        <Text c={record.note ? "black" : "dimmed"} fz={"xs"}>
                          {record.note || "작성 내용이 없습니다."}
                        </Text>
                        <ActionIcon variant="subtle" color="gray.4" size={"sm"}>
                          <IconChevronRight />
                        </ActionIcon>
                        {/* <ButtonByApprovalStatus setTargetInfo={setTargetInfo} record={record} open={openConfirmModal} /> */}
                      </Group>
                    </Stack>
                  </ListItem>
                );
              })}
            </List>
          </FetchWrapper>
        </Stack>
      </Paper>

      <ApprovalConfirm opened={confirmModal} close={closeConfirmModal} details={targetInfo} />
    </Container>
  );
};

export default page;
