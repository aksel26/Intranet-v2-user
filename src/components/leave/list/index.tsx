import { Button, Divider, Grid, Group, Paper, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { leaveService } from "@/api/services/leave/leave.services";
import { useApiQuery } from "@/api/useApi";
import MonthFilter from "@/components/common/filter/month";
import { isDateBeforeToday } from "@/utils/date/isBeforeToday";
import { Upload } from "lucide-react";
import MonthBadge from "../badge/MonthBadge";
import CcList from "../cc";
import ConfirmStatus from "../status";

const VacationList = ({ params, setParams, openAttachmentModal, openVacationModal }: any) => {
  const { data, isLoading, isError } = useApiQuery(["vacationAll", params], () => leaveService.getLeaves(params));

  const vacations = data?.data.data;

  const ListWrapper = () => {
    return (
      <Stack gap={2} w={"100%"} mt={"md"}>
        <Text fz={"sm"} fw={500} c={"gray"}>
          휴가 사용 내역
        </Text>

        <Paper bg={"white"} p="lg" py={"lg"} radius={"lg"}>
          {vacations?.length < 1 ? (
            <Stack gap={"xs"}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Text c={"dimmed"} fz={"sm"}>
                  휴가 사용 내역이 없습니다.
                </Text>
                <MonthFilter trigger={setParams} />
              </Group>
              <Group>
                <MonthBadge params={params} setParams={setParams} />
              </Group>
            </Stack>
          ) : (
            <Stack gap={"xs"}>
              <Group justify="space-between" align="center" wrap="nowrap">
                <Text c={"gray.5"} fz={"sm"}>
                  총{" "}
                  <Text component="span" c={"black"} fz={"sm"}>
                    {vacations?.length}건
                  </Text>
                  의 휴가 내역이 있습니다.
                </Text>
                <MonthFilter trigger={setParams} />
              </Group>
              <Group>
                <MonthBadge params={params} setParams={setParams} />
              </Group>
              <Divider my={"xs"} color="gray.1" />
              {vacations?.map((record: any, index: number, arr: any) => {
                return <Items key={record.commuteIdx} record={record} index={index} arr={arr} />;
              })}
            </Stack>
          )}
        </Paper>
      </Stack>
    );
  };

  const Items = ({ record, index, arr }: any) => {
    return (
      <Stack key={record.commuteIdx} gap={"xs"}>
        <Group justify="space-between" align="start" wrap="nowrap">
          <Stack gap={3}>
            <Text fz={"xs"} fw={400} c={"gray"}>
              {dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}
            </Text>

            <Text fz={"sm"} fw={500}>
              {record.leaveType}
            </Text>
          </Stack>
          {isDateBeforeToday(record.commuteDate) ? null : (
            <Button variant="light" color="red" size="compact-xs" onClick={() => openVacationModal(record)}>
              취소
            </Button>
          )}
        </Group>
        <Grid gutter={"xs"}>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Stack gap={4}>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={80}>
                  차감개수
                </Text>
                <Text fz={"xs"}>{record.annualLeaveReduceUnit}</Text>
              </Group>
              <Group gap={"xs"}>
                {record.confirmYN === "Y" ? (
                  <Text fz={"xs"} c={"gray.5"} w={80}>
                    잔여 개수
                  </Text>
                ) : (
                  <Text fz={"xs"} c={"gray.5"} w={80}>
                    (예상) 잔여 개수
                  </Text>
                )}

                <Text fz={"xs"}>{record.remainingAnnualLeaveQuota}</Text>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Stack gap={4}>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  결재자
                </Text>
                <Group gap={"xs"}>
                  {record.confirmPersonName ? (
                    <Text c={"black"} fz={"xs"}>
                      {record.confirmPersonName}
                    </Text>
                  ) : (
                    record.approverInfo.map((approver: any, index: number) => (
                      <Text key={index} fz={"xs"}>
                        {approver.approverName}
                      </Text>
                    ))
                  )}
                </Group>
              </Group>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  참조자
                </Text>

                <CcList ccUserInfo={record.ccUserInfo} />
              </Group>

              <Group gap={"xs"} wrap="nowrap" align="center">
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  결재상태
                </Text>
                <ConfirmStatus record={record} />
              </Group>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  결재일자
                </Text>
                <Text c={"dimmed"} fz={"xs"}>
                  {record.confirmDate || "-"}
                </Text>
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack gap={4}>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  첨부파일
                </Text>
                {record.imageUrl ? (
                  <Button onClick={() => openAttachmentModal(record)} size="compact-xs" variant="light" maw={100}>
                    <Text fz={"xs"} truncate="end">
                      {record.imageName}
                    </Text>
                  </Button>
                ) : (
                  <Button leftSection={<Upload size={12} />} variant="white" color="blue" size="compact-xs" onClick={() => openAttachmentModal(record)} px={0}>
                    업로드
                  </Button>
                )}
              </Group>

              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  내용
                </Text>
                {record.note ? (
                  <Text fz={"xs"}>{record.note}</Text>
                ) : (
                  <Text fz={"xs"} c={"dimmed"}>
                    특이사항이 없습니다.
                  </Text>
                )}
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
        {arr.length === index + 1 ? null : <Divider my={"xs"} color="gray.1" />}
      </Stack>
    );
  };

  return <ListWrapper />;
};

export default VacationList;
