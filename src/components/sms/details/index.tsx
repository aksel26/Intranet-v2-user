import { smsService } from "@/api/services/sms/sms.services";
import { useApiQuery } from "@/api/useApi";
import { formatTimeFull } from "@/utils/date/format";
import { Badge, Group, Paper, ScrollArea, Stack, Text } from "@mantine/core";
const Value = ({ content }: { content: string }) => {
  return <Text fz={"xs"}>{content}</Text>;
};
const SmsDetails = () => {
  const { data, isLoading, isError } = useApiQuery(
    ["sms"],
    smsService.getAllSMS
  );

  const details = data?.data.data;
  return (
    <Stack gap={2} visibleFrom="md">
      <Text fz="sm" c={"gray"}>
        발송내역(PC화면){" "}
        <Text fz={"sm"} c={"black"} component="span">
          {details?.length}건
        </Text>
      </Text>
      <ScrollArea h={"75vh"}>
        <Stack gap={"md"}>
          {details?.map((content: any, index: number) => (
            <Paper
              radius={"md"}
              bg={"white"}
              p={"md"}
              key={content.smsMessageIdx}
            >
              <Stack gap={"xs"}>
                <Group justify="space-between">
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      발송시간
                    </Text>
                    <Value content={formatTimeFull(content.createdAt)} />
                  </Group>
                  <Badge size="xs" variant="light" radius={"sm"}>
                    LMS
                  </Badge>
                </Group>
                <Group justify="space-between" align="start">
                  <Stack gap={"xs"}>
                    <Group gap={"xs"}>
                      <Text fz={"xs"} c={"gray"} w={50}>
                        수신번호
                      </Text>
                      <Value content={content.toPhoneNumber} />
                    </Group>
                    <Group gap={"xs"}>
                      <Text fz={"xs"} c={"gray"} w={50}>
                        회신번호
                      </Text>
                      <Value content={content.fromPhoneNumber} />
                    </Group>
                  </Stack>
                </Group>
                <Group gap={"xs"} align="start">
                  <Text fz={"xs"} c={"gray"} w={50}>
                    내용
                  </Text>
                  <Text flex={1} fz={"xs"}>
                    {content.message}
                  </Text>
                </Group>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};

export default SmsDetails;
