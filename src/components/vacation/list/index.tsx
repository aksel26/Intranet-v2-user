import { getMyVacations } from "@/app/api/get/getApi";
import ConfirmStatus from "@/components/Attendance/ConfirmStatus";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import MonthFilter from "@/components/ui/monthFilter";
import { isDateBeforeToday } from "@/utils/date/isBeforeToday";
import { Button, Divider, Grid, Group, Paper, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const VacationList = ({ params, setParams, openAttachmentModal, openVacationModal }: any) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => getMyVacations(params) });
  const vacations = data?.data.data;

  const ListWrapper = () => {
    return (
      <Stack gap={2} w={"100%"}>
        <Group align="center" justify="space-between" mt={"md"} mb={"xs"}>
          <Text fz={"sm"} fw={500} c={"gray"}>
            휴가 사용 내역
          </Text>
          <MonthFilter trigger={setParams} />
        </Group>
        <Paper bg={"white"} p="lg" py={"lg"} radius={"lg"}>
          <Stack gap={"lg"}>
            {vacations?.map((record: any, index: number, arr: any) => {
              return <Items key={record.commuteIdx} record={record} index={index} arr={arr} />;
            })}
          </Stack>
        </Paper>
      </Stack>
    );
  };

  const Items = ({ record, index, arr }: any) => {
    return (
      <Stack key={record.commuteIdx} gap={"xs"}>
        <Stack gap={3}>
          <Text fz={"xs"} fw={500} c={"dimmed"}>
            {dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}
          </Text>

          <Text fz={"sm"} fw={500}>
            {record.leaveType}
          </Text>
        </Stack>
        <Grid gutter={"xs"}>
          <Grid.Col span={{ base: 6, md: 2 }}>
            <Stack gap={4}>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={90}>
                  차감갯수
                </Text>
                <Text fz={"xs"}>{record.annualLeaveReduceUnit}</Text>
              </Group>
              <Group gap={"xs"}>
                {record.confirmYN === "Y" ? (
                  <Text fz={"xs"} c={"gray.5"} w={90}>
                    잔여 개수
                  </Text>
                ) : (
                  <Text fz={"xs"} c={"gray.5"} w={90}>
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
                {/* <ConfirmStatus record={record} /> */}
              </Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 3 }}>
            <Stack gap={4}>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  참조자
                </Text>
                <Group gap={"xs"}>
                  {record.ccUserInfo.length < 1 ? (
                    <Text c={"dimmed"} fz={"xs"}>
                      -
                    </Text>
                  ) : (
                    record.ccUserInfo.map((cc: any, index: number) => (
                      <Text key={index} c={"dimmed"} fz={"xs"}>
                        {cc.ccUserName}
                      </Text>
                    ))
                  )}
                </Group>
              </Group>
              <Group gap={"xs"}>
                <Text fz={"xs"} c={"gray.5"} w={50}>
                  첨부파일
                </Text>
                {record.imageUrl ? (
                  <Text fz={"xs"} td="underline" c={"blue"} onClick={() => openAttachmentModal(record)} styles={{ root: { cursor: "pointer" } }}>
                    조회
                  </Text>
                ) : (
                  <Text fz={"xs"} td="underline" c={"dimmed"} onClick={() => openAttachmentModal(record)} styles={{ root: { cursor: "pointer" } }}>
                    업로드하기
                  </Text>
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

          {isDateBeforeToday(record.commuteDate) ? null : (
            <Button variant="light" color="red" size="compact-xs" onClick={() => openVacationModal(record)}>
              취소
            </Button>
          )}
        </Grid>
        {arr.length === index + 1 ? null : <Divider my={"md"} color="gray.1" />}
      </Stack>
    );
  };
  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>휴가정보를 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    if (vacations?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return <>{renderContent()}</>;
};

export default VacationList;
