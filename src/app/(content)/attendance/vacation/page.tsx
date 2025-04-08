"use client";

import * as api from "@/app/api/get/getApi";
import "@/styles/calendar.css";
import { Breadcrumbs, Button, Collapse, Container, Flex, Group, Loader, Paper, Select, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import ArrowDown from "/public/icons/arrow-down.svg";
import ArrowRight from "/public/icons/arrow-right.svg";

import CancleVacation from "@/components/Attendance/CancleVacation";
import ConfirnStatus from "@/components/Attendance/ConfirmStatus";
import ToolTipDetailsVacation from "@/components/Attendance/ToolTipDetailsVacation";
import { TYearMonth } from "@/types/apiTypes";
import { monthList, yearsList } from "@/utils/dateFomat";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Attachment from "@/components/Attendance/Attachment";
dayjs.locale("ko");

const items = [{ title: "휴가/연차 상세조회", href: "#" }].map((item, index) => (
  <Text size="lg" fw={600} component="a" key={index}>
    {/* <Anchor href={item.href} key={index}> */}
    {item.title}
    {/* </Anchor> */}
  </Text>
));

function page() {
  const [cancelVacationOpened, { open: cancelOpenVacationModal, close: cancelVacationModalClose }] = useDisclosure(false);
  const [attachmentModalOpened, { open: attachmentModalOpen, close: attachmentModalClose }] = useDisclosure(false);

  const [params, setParams] = useState<TYearMonth>({
    year: dayjs().year().toString(),
    month: (dayjs().month() + 1).toString(),
  });
  const { data, isLoading, isError } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => api.getMyVacations(params) });
  const {
    data: summary,
    isLoading: isLoading_summary,
    isError: isError_summary,
  } = useQuery({ queryKey: ["vacationSummary", { year: params.year }], queryFn: () => api.getVacationSummary({ year: params.year }) });

  const vacations = data?.data.data;
  const leaveSummary = summary?.data.data.leaveSummary;
  const leaveUsageStats = summary?.data.data.leaveUsageStats;

  const [openedId, setOpenedId] = useState<number | null>(null);

  const [monthValue, setMonthValue] = useState<string | null>((dayjs().month() + 1).toString());
  const [yearValue, setYearValue] = useState<string | null>(dayjs().year().toString());
  const [isActive, setIsActive] = useState({
    yearSelect: false,
    monthSelect: false,
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
  const [currentVacationInfo, setCurrentVacationInfo] = useState();
  const openVacationModal = (record: any) => {
    setCurrentVacationInfo(record);
    cancelOpenVacationModal();
  };
  const openAttachmentModal = (record: any) => {
    setCurrentVacationInfo(record);
    attachmentModalOpen();
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
      {/* <Breadcrumbs mb={"md"}>{items}</Breadcrumbs> */}

      <Stack gap={1}>
        <Breadcrumbs mb={"md"}>{items}</Breadcrumbs>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          나의 휴가/연차 사용 내역을 조회합니다.
        </Text>
      </Stack>

      <Select
        mt={"md"}
        mb={2}
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
          input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
        }}
        dropdownOpened={isActive.yearSelect}
        onBlur={() => setIsActive((prev) => ({ ...prev, yearSelect: false }))}
        onClick={() => {
          setIsActive((prev) => ({ ...prev, yearSelect: true }));
        }}
      />
      <Flex gap={"md"} wrap={"wrap"}>
        <Paper bg={"white"} px="lg" py="md" radius={"lg"} h={"100%"} miw={300}>
          {isLoading_summary ? (
            <Loader color="blue" type="dots" />
          ) : (
            <Group gap={"xl"}>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
                  입사일
                </Text>
                <Text fw={600} ta={"center"} fz={"sm"}>
                  {leaveSummary.joinDate}
                </Text>
              </Stack>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
                  근속년수
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={600} component="span" fz={"md"}>
                    {leaveSummary.yearsSinceJoin}
                  </Text>
                  년
                </Text>
              </Stack>
              {leaveSummary.yearsSinceJoin >= 3 ? null : (
                <>
                  <Stack gap={4}>
                    <Text c={"dimmed"} fz={"xs"}>
                      만 1년 날짜
                    </Text>
                    <Text fz={"sm"} fw={600} ta={"center"}>
                      {leaveSummary.oneYearAfterJoin}
                    </Text>
                  </Stack>
                  <Stack gap={4}>
                    <Text c={"dimmed"} fz={"xs"}>
                      중도입사 연차 부여
                    </Text>
                    <Text fz={"sm"} ta={"center"}>
                      <Text fw={600} component="span" fz={"md"}>
                        {leaveSummary.midJoinReceivedAnnualLeave}
                      </Text>
                      개
                    </Text>
                  </Stack>
                </>
              )}
            </Group>
          )}
        </Paper>

        <Paper bg={"white"} px="lg" py="md" h={"100%"} radius={"lg"} miw={300} pos={"relative"}>
          {isLoading_summary ? (
            <Loader color="blue" type="dots" />
          ) : (
            <Group gap={"xl"} justify="space-around" align="end">
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
                  총 연차 개수
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={600} component="span" fz={"md"}>
                    {leaveSummary.totalReceivedAnnualLeave}
                  </Text>
                  일
                </Text>
              </Stack>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
                  사용 연차
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={600} component="span" fz={"md"}>
                    {leaveSummary.totalAnnualLeaveUsage}
                  </Text>
                  일
                </Text>
              </Stack>
              <Stack gap={4}>
                <Text c={"dimmed"} fz={"xs"}>
                  잔여 연차
                </Text>
                <Text fz={"sm"} ta={"center"}>
                  <Text fw={600} component="span" fz={"md"}>
                    {leaveSummary.totalAnnualLeaveBalance}
                  </Text>
                  일
                </Text>
              </Stack>

              <ToolTipDetailsVacation details={leaveUsageStats} />
            </Group>
          )}
        </Paper>
      </Flex>

      <Select
        mt={"lg"}
        mb={2}
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
          input: { background: "transparent", border: "none", fontSize: "var(--mantine-font-size-lg)", fontWeight: 600 },
        }}
        dropdownOpened={isActive.monthSelect}
        onBlur={() => setIsActive((prev) => ({ ...prev, monthSelect: false }))}
        onClick={() => {
          setIsActive((prev) => ({ ...prev, monthSelect: true }));
        }}
      />

      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        {isLoading ? (
          <Group justify="center" py={"xl"}>
            <Loader color="blue" type="dots" />
          </Group>
        ) : (
          <Stack py={"md"} gap={"lg"}>
            {vacations.length === 0 ? (
              <Group justify="center" py={"xl"}>
                <Text fz={"sm"} c={"gray.6"}>
                  조회된 내역이 없습니다.
                </Text>
              </Group>
            ) : (
              vacations?.map((record: any) => {
                const isOpen = openedId === record.commuteIdx;
                return (
                  <Stack key={record.commuteIdx} gap={2} styles={{ root: { cursor: "pointer" } }}>
                    <Group gap={2} align="center" justify="space-between" wrap="nowrap" onClick={() => setOpenedId(isOpen ? null : record.commuteIdx)}>
                      <div className="flex flex-col">
                        <Text c={"dimmed"} fz={"xs"}>
                          {record.commuteDate}
                        </Text>
                        <Group py={4}>
                          <Text fz={"sm"}>{record.leaveType}</Text>
                          <Text fz={"sm"} component="span">
                            {record.attendance}
                          </Text>
                        </Group>
                        {/* {workTimeByLeaveType(record)} */}
                      </div>
                      {isOpen ? <ArrowDown /> : <ArrowRight />}
                    </Group>
                    <Collapse in={isOpen}>
                      <div className="flex gap-y-4 gap-x-8 flex-wrap items-end">
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            차감갯수
                          </Text>
                          <Text fz={"xs"}>{record.annualLeaveReduceUnit}</Text>
                        </Stack>
                        <Stack gap={1}>
                          {record.confirmYN === "Y" ? (
                            <Text fz={"xs"} c={"dimmed"}>
                              잔여 개수
                            </Text>
                          ) : (
                            <Text fz={"xs"} c={"dimmed"}>
                              (예상) 잔여 개수
                            </Text>
                          )}

                          <Text fz={"xs"}>{record.remainingAnnualLeaveQuota}</Text>
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            결재일자
                          </Text>
                          <ConfirnStatus record={record} />
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            결재자
                          </Text>
                          <Text c={!record.confirmPersonName ? "dimmed" : "black"} fz={"xs"}>
                            {record.confirmPersonName || "결재 승인 전 입니다."}
                          </Text>
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            첨부파일
                          </Text>
                          {record.imageUrl ? (
                            <Text fz={"xs"} td="underline" c={"blue"} onClick={() => openAttachmentModal(record)}>
                              확인하기
                            </Text>
                          ) : (
                            <Text fz={"xs"} td="underline" c={"dimmed"} onClick={() => openAttachmentModal(record)}>
                              업로드하기
                            </Text>
                          )}
                        </Stack>
                        <Stack gap={1}>
                          <Text fz={"xs"} c={"dimmed"}>
                            내용
                          </Text>
                          {record.note ? (
                            <Text fz={"xs"}>{record.note}</Text>
                          ) : (
                            <Text fz={"xs"} c={"dimmed"}>
                              특이사항이 없습니다.
                            </Text>
                          )}
                        </Stack>
                        {record.confirmYN === "N" ? (
                          <Button variant="outline" color="red" size="xs" onClick={() => openVacationModal(record)}>
                            신청취소
                          </Button>
                        ) : (
                          <Button variant="outline" color="gray" size="xs" onClick={() => openVacationModal(record)}>
                            삭제
                          </Button>
                        )}
                      </div>
                    </Collapse>
                  </Stack>
                );
              })
            )}
          </Stack>
        )}
      </Paper>
      <CancleVacation opened={cancelVacationOpened} close={cancelVacationModalClose} details={currentVacationInfo} />
      <Attachment opened={attachmentModalOpened} close={attachmentModalClose} details={currentVacationInfo} />
      {/* <Vacation opened={opened} close={close} /> */}
    </Container>
  );
}

export default page;
