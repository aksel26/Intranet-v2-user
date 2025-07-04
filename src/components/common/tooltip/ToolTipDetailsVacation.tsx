import { Divider, Group, Paper, Popover, Stack, Text, Title } from "@mantine/core";
const CountText = ({ children }: any) => {
  return <Text size="xs">{children} 개</Text>;
};
const LabelText = ({ children }: any) => {
  return (
    <Text size="xs" w={70} ta={"left"}>
      {children}
    </Text>
  );
};
const ToolTipDetailsVacation = ({ details, children }: any) => {
  if (!details) return null;
  const {
    alternativeLeaveUsage,
    familyEventLeaveUsage,
    fullLeaveUsage,
    halfLeaveUsage,
    healthLeaveUsage,
    quarterLeaveUsage,
    sickLeaveUsage,
    specialLeaveUsage,
    trainingLeaveUsage,
    totalReceivedSpecialLeave,
    totalReceivedAlternativeLeave,
  } = details;

  return (
    <Popover width={"auto"} position="bottom-end" withArrow shadow="md">
      <Popover.Target>{children}</Popover.Target>
      <Popover.Dropdown py={"md"}>
        <Paper bg={"white"} radius={"lg"}>
          <Title order={6} mb={"xs"}>
            휴가/연차 유형별 사용 현황
          </Title>
          <Stack gap={"md"}>
            <Group align="center" justify="space-between">
              <LabelText>연차</LabelText>
              <CountText>{fullLeaveUsage}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>반차</LabelText>
              <CountText>{halfLeaveUsage}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>반반차</LabelText>
              <CountText>{quarterLeaveUsage}</CountText>
            </Group>
            <Divider />
            <Group align="center" justify="space-between">
              <LabelText>보건휴가</LabelText>
              <CountText>{healthLeaveUsage}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>특별 휴무</LabelText>
              <CountText>{`${specialLeaveUsage} / ${totalReceivedSpecialLeave}`}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>경조 휴무</LabelText>
              <CountText>{familyEventLeaveUsage}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>병가</LabelText>
              <CountText>{sickLeaveUsage}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>대체 휴무</LabelText>
              <CountText>{`${alternativeLeaveUsage} / ${totalReceivedAlternativeLeave}`}</CountText>
            </Group>
            <Group align="center" justify="space-between">
              <LabelText>훈련</LabelText>
              <CountText>{trainingLeaveUsage}</CountText>
            </Group>
          </Stack>
        </Paper>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ToolTipDetailsVacation;
