// import * as api from "@/app/api/get/getApi";
// import { ErrorView } from "@/components/common/view/ErrorView";
// import LoadingView from "@/components/common/view/LoadingView";
import { leaveService } from "@/api/services/leave/leave.services";
import { useApiQuery } from "@/api/useApi";
import { ErrorView } from "@/components/common/error";
import LoadingView from "@/components/loading";
import { Divider, Group, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import React from "react";

const Label = ({ label }: { label: string }) => {
  return (
    <Text fz={"sm"} c={"dimmed"}>
      {label}
    </Text>
  );
};

const Result = ({ value, suffix = "건" }: { value: number; suffix?: string }) => {
  return (
    <Text fz={"sm"} ta={"center"}>
      <Text fw={500} component="span" fz={"md"} mr={2}>
        {value}
      </Text>
      {suffix}
    </Text>
  );
};

const SUMMARY_LABEL = [
  { label: "총 연차 수", value: "totalReceivedAnnualLeave" },
  { label: "사용 연차 수", value: "totalAnnualLeaveUsage" },
  { label: "잔여 연차 수", value: "totalAnnualLeaveBalance" },
  { label: "미승인 요청건", value: "notConfirmLeaveCount" },
];

const VacationSummary = () => {
  const currentYear = dayjs().year().toString();

  const { data, isLoading, isError } = useApiQuery(["vacationSummary", { year: currentYear }], () => leaveService.getLeaveSummary({ year: currentYear }));

  const summary = data?.data.data.leaveSummary || {};

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>휴가요약 정보를 불러오는 중 문제가 발생하였습니다.</ErrorView>;
    return (
      <Group gap={"xs"} justify="space-evenly">
        {SUMMARY_LABEL.map((item, index, arr) => (
          <React.Fragment key={index}>
            <Stack key={index} gap={4}>
              <Label label={item.label} />
              <Result value={summary[item.value]} />
            </Stack>
            {arr.length === index + 1 ? null : <Divider orientation="vertical" size={0.2} />}
          </React.Fragment>
        ))}
      </Group>
    );
  };
  return <>{renderContent()}</>;
};

export default VacationSummary;
