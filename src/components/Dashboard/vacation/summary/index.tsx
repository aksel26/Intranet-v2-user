import * as api from "@/app/api/get/getApi";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { Divider, Group, Stack, Text } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import React from "react";

const Label = ({ label }: { label: string }) => {
  return (
    <Text fz={"xs"} c={"dimmed"}>
      {label}
    </Text>
  );
};

const Result = ({
  value,
  suffix = "건",
}: {
  value: number;
  suffix?: string;
}) => {
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
  const currentYear = dayjs().year();
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["vacationSummary", { year: currentYear }],
    queryFn: () =>
      api.getAttendanceSummary({ year: currentYear }).then((res) => res.data),
  });

  const summary = data?.data.leaveSummary || {};

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError)
      return (
        <ErrorView>
          휴가요약 정보를 불러오는 중 문제가 발생하였습니다.
        </ErrorView>
      );
    return (
      <Group gap={"sm"} justify="space-evenly">
        {SUMMARY_LABEL.map((item, index, arr) => (
          <React.Fragment key={index}>
            <Stack key={index} gap={4}>
              <Label label={item.label} />
              <Result value={summary[item.value]} />
            </Stack>
            {arr.length === index + 1 ? null : (
              <Divider orientation="vertical" size={0.5} />
            )}
          </React.Fragment>
        ))}
      </Group>
    );
  };
  return <>{renderContent()}</>;
};

export default VacationSummary;
