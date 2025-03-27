"use client";
import * as api from "@/app/api/get/getApi";
import { TApproval } from "@/types/apiTypes";
import { monthList, yearsList } from "@/utils/dateFomat";
import { Badge, Button, Container, Group, Paper, Select, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
const vacations = [
  {
    commuteIdx: 1,
    commuteDate: "2021-09-01",
    leaveType: "연차",
    attendance: "휴가",
    annualLeaveReduceUnit: 1,
    remainingAnnualLeaveQuota: 10,
    confirmPersonName: "홍길동",
    note: "비상업무로 인한 휴가",
    confirmYN: "Y",
  },
  {
    commuteIdx: 2,
    commuteDate: "2021-09-01",
    leaveType: "연차",
    attendance: "휴가",
    annualLeaveReduceUnit: 1,
    remainingAnnualLeaveQuota: 10,
    confirmPersonName: "홍길동",
    note: "비상업무로 인한 휴가",
    confirmYN: "Y",
  },
  {
    commuteIdx: 3,
    commuteDate: "2021-09-01",
    leaveType: "연차",
    attendance: "휴가",
    annualLeaveReduceUnit: 1,
    remainingAnnualLeaveQuota: 10,
    confirmPersonName: "홍길동",
    note: "비상업무로 인한 휴가",
    confirmYN: "Y",
  },
];

const ApprovalStatus = ({ status }: any) => {
  return (
    <Badge color={status === "승인요청" ? "blue.5" : "lime.5"} radius="sm" size="sm">
      {status}
    </Badge>
  );
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
    user: "",
  });
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
    setParams((params) => ({ ...params, user: e }));
    setUserValue(e);
    setIsActive((prev) => ({ ...prev, userSelect: false }));
  };

  const [confirmPerson, setConfirmPerson] = useState<string[]>();
  const selectConfirm = (data: any) => setConfirmPerson(data);
  useEffect(() => {
    setConfirmList(data?.data.data.filter((item: any) => item.gradeIdx <= 4));
  }, [data]);

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
          결재 및 승인
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
          {vacations.length === 0 ? (
            <Group justify="center" py={"xl"}>
              <Text fz={"sm"} c={"gray.6"}>
                조회된 내역이 없습니다.
              </Text>
            </Group>
          ) : (
            vacations?.map((record: any) => {
              return (
                <Stack key={record.commuteIdx} gap={5} styles={{ root: { cursor: "pointer" } }}>
                  <Group gap={2} align="center" justify="space-between" wrap="nowrap">
                    <Stack gap={5}>
                      <Text c={"dimmed"} fz={"xs"}>
                        {record.commuteDate}(토)
                      </Text>
                      <Group gap={"xl"}>
                        <ApprovalStatus status={"승인요청"} />
                        <Text fz={"xs"}>김단아</Text>
                        <Text fz={"xs"}>특별휴무 반반차(오전)</Text>
                        <Text fz={"xs"}>워크샵 경품워크샵 경품워크샵 경품워크샵 경품</Text>
                        <Text fz={"xs"} c={"green.5"}>
                          승인완료
                          <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
                            (2023-12-11)
                          </Text>
                        </Text>
                        <Text fz={"xs"} c={"red.4"}>
                          반려
                          <Text component="span" fz={"xs"} c={"dimmed"} ml={5}>
                            (2023-12-11)
                          </Text>
                        </Text>
                        <Group gap={"xs"}>
                          <Button variant="light" size="compact-xs" color="green.4">
                            승인
                          </Button>
                          <Button variant="light" size="compact-xs" color="red.4">
                            반려
                          </Button>
                        </Group>
                        <Button variant="light" size="compact-xs" color="gray">
                          삭제
                        </Button>
                      </Group>
                    </Stack>
                  </Group>
                </Stack>
              );
            })
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default page;
