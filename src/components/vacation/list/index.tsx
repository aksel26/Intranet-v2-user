import { getMyVacations } from "@/app/api/get/getApi";
import ConfirmStatus from "@/components/Attendance/ConfirmStatus";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { isDateBeforeToday } from "@/utils/date/isBeforeToday";
import { Button, Divider, Group, Paper, Stack, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";

const VacationList = ({ params, openAttachmentModal, openVacationModal }: any) => {
  const { data, isLoading, isError } = useQuery({ queryKey: ["vacationAll", params], queryFn: () => getMyVacations(params) });
  const vacations = data?.data.data;

  const ListWrapper = () => {
    return (
      <Paper bg={"white"} p="lg" py={"lg"} radius={"lg"}>
        <Stack gap={"lg"}>
          {vacations?.map((record: any, index: number, arr: any) => {
            return <Items key={record.commuteIdx} record={record} index={index} arr={arr} />;
          })}
        </Stack>
      </Paper>
    );
  };

  const Items = ({ record, index, arr }: any) => {
    return (
      <Stack key={record.commuteIdx} gap={"xs"}>
        <Text fz={"sm"} fw={600} c={"dimmed"}>
          {dayjs(record.commuteDate).format("YYYY-MM-DD (dd)")}
        </Text>

        <Text fz={"sm"} fw={600}>
          {record.leaveType}
        </Text>
        <Group gap={"xl"} align="end">
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
              차감갯수
            </Text>
            <Text fz={"xs"}>{record.annualLeaveReduceUnit}</Text>
          </Stack>
          <Stack gap={1}>
            {record.confirmYN === "Y" ? (
              <Text fz={"xs"} c={"gray.5"}>
                잔여 개수
              </Text>
            ) : (
              <Text fz={"xs"} c={"gray.5"}>
                (예상) 잔여 개수
              </Text>
            )}

            <Text fz={"xs"}>{record.remainingAnnualLeaveQuota}</Text>
          </Stack>

          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
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
          </Stack>
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
              결재상태
            </Text>
            <ConfirmStatus record={record} />
          </Stack>
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
              결재일자
            </Text>
            <Text c={"dimmed"} fz={"xs"}>
              {record.confirmDate || "-"}
            </Text>
            {/* <ConfirmStatus record={record} /> */}
          </Stack>
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
              참조자
            </Text>
            <Group gap={"xs"}>
              {record.ccUserInfo.map((cc: any, index: number) => (
                <Text key={index} c={"dimmed"} fz={"xs"}>
                  {cc.ccUserName}
                </Text>
              ))}
            </Group>
          </Stack>
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
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
          </Stack>
          <Stack gap={1}>
            <Text fz={"xs"} c={"gray.5"}>
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

          {isDateBeforeToday(record.commuteDate) ? null : (
            <Button variant="light" color="red" size="compact-xs" onClick={() => openVacationModal(record)}>
              취소
            </Button>
          )}
        </Group>
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
