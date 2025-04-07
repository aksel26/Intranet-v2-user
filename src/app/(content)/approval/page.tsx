"use client";
import * as api from "@/app/api/get/getApi";
import ApprovalConfirm from "@/components/Approval/confirm";
import FetchWrapper from "@/components/fetchWrapper";
import { RELATION_TYPE } from "@/lib/enums";
import { TApproval } from "@/types/apiTypes";
import { monthList, yearsList } from "@/utils/dateFomat";
import { Badge, Button, Container, Group, Paper, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const ApprovalType = ({ children }: { children: keyof typeof RELATION_TYPE }) => {
  return (
    <Badge miw={70} color={children === "APPROVER" ? "blue.5" : "lime.5"} radius="sm" size="sm">
      {RELATION_TYPE[children]}
    </Badge>
  );
};
const ApprovalStatus = ({ record }: { record: any }) => {
  const { confirmYN, confirmDate, rejectDate } = record;
  if (confirmYN === "Y") {
    return (
      <Text fz={"xs"} c={"green.5"} miw={140}>
        승인완료
        <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
          ({confirmDate})
        </Text>
      </Text>
    );
  } else if (confirmYN === "N") {
    if (!rejectDate) {
      return (
        <Text fz={"xs"} c={"yellow.5"} miw={140}>
          승인 대기
        </Text>
      );
    } else {
      return (
        <Text fz={"xs"} c={"red.4"} miw={140}>
          반려
          <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
            ({rejectDate})
          </Text>
        </Text>
      );
    }
  }
};

const ButtonByApprovalStatus = ({ record, setTargetInfo, open }: { record: any; open: () => void; setTargetInfo: any }) => {
  const { confirmYN, rejectDate } = record;
  if (confirmYN === "Y") {
    return (
      <Button variant="light" size="compact-xs" color="gray">
        삭제
      </Button>
    );
  } else if (confirmYN === "N") {
    if (!rejectDate) {
      return (
        <Group gap={"xs"}>
          <Button
            variant="light"
            size="compact-xs"
            color="green.4"
            onClick={() => {
              setTargetInfo(record);
              open();
            }}
          >
            승인
          </Button>
          <Button variant="light" size="compact-xs" color="red.4">
            반려
          </Button>
        </Group>
      );
    } else {
      return (
        <Button variant="light" size="compact-xs" color="gray">
          삭제
        </Button>
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
            {approvalsList?.map((record: any) => {
              return (
                <Stack key={record.commuteIdx} gap={5} styles={{ root: { cursor: "pointer" } }}>
                  <Group gap={2} align="center" justify="space-between" wrap="nowrap">
                    <Stack gap={5}>
                      <Text c={"dimmed"} fz={"xs"}>
                        {`${dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}`}
                      </Text>
                      <Group gap={"xl"}>
                        <ApprovalType>{record.relationType}</ApprovalType>
                        <Text w={40} fz={"xs"}>
                          {record.userName}
                        </Text>
                        <Text miw={60} fz={"xs"}>
                          {record.leaveType}
                        </Text>

                        <ApprovalStatus record={record} />

                        <Text c={record.note ? "black" : "dimmed"} fz={"xs"}>
                          {record.note || "작성 내용이 없습니다."}
                        </Text>
                        <ButtonByApprovalStatus setTargetInfo={setTargetInfo} record={record} open={openConfirmModal} />
                      </Group>
                    </Stack>
                  </Group>
                </Stack>
              );
            })}
          </FetchWrapper>
        </Stack>
      </Paper>

      <ApprovalConfirm opened={confirmModal} close={closeConfirmModal} details={targetInfo} />
    </Container>
  );
};

export default page;
