import { smsService } from "@/api/services/sms/sms.services";
import { useApiQuery } from "@/api/useApi";
import { formatTimeFull } from "@/utils/date/format";
import {
  Badge,
  Group,
  Modal,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";

const Value = ({ content }: { content: string }) => {
  return <Text fz={"xs"}>{content}</Text>;
};

const SmsDetailsModal = ({ opened, close }: any) => {
  const { data, isLoading, isError } = useApiQuery(
    ["sms"],
    smsService.getAllSMS,
    { enabled: !!opened }
  );

  const details = data?.data.data;
  return (
    <Modal opened={opened} onClose={close} title="발송 내역" centered>
      <ScrollArea h={"80vh"}>
        <Stack gap={"xs"}>
          {details?.map((content: any, index: number) => (
            <Paper
              radius={"md"}
              bg={"gray.1"}
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
    </Modal>
  );
};

export default SmsDetailsModal;
