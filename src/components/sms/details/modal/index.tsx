import { Badge, Group, Modal, Paper, ScrollArea, Stack, Text } from "@mantine/core";

const Value = ({ content }: { content: string }) => {
  return <Text fz={"xs"}>{content}</Text>;
};

const SmsDetailsModal = ({ opened, close }: any) => {
  return (
    <Modal opened={opened} onClose={close} title="발송 내역" centered>
      <ScrollArea h={"80vh"}>
        <Stack gap={"xs"}>
          <Paper radius={"md"} bg={"gray.1"} p={"md"}>
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"} w={50}>
                    발송시간
                  </Text>
                  <Value content={"2025-06-02 오전 10:41:46	"} />
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
                    <Value content={"010-3232-1212"} />
                  </Group>
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      회신번호
                    </Text>
                    <Value content={"010-3232-1212"} />
                  </Group>
                </Stack>
              </Group>
              <Group gap={"xs"} align="start">
                <Text fz={"xs"} c={"gray"} w={50}>
                  내용
                </Text>
                <Text flex={1} fz={"xs"}>
                  [온라인 인적성검사 안내] 응시자님의 검사 재개를 위해 지속해서 연락을 드렸으나 연락이 닿지 않아 문자 드립니다. 문자를 확인하시면 프로그램 재접속 및 발신 번호로 신속히 연락 바랍니다.
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Paper radius={"md"} bg={"gray.1"} p={"md"}>
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"} w={50}>
                    발송시간
                  </Text>
                  <Value content={"2025-06-02 오전 10:41:46	"} />
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
                    <Value content={"010-3232-1212"} />
                  </Group>
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      회신번호
                    </Text>
                    <Value content={"010-3232-1212"} />
                  </Group>
                </Stack>
              </Group>
              <Group gap={"xs"} align="start">
                <Text fz={"xs"} c={"gray"} w={50}>
                  내용
                </Text>
                <Text flex={1} fz={"xs"}>
                  [온라인 인적성검사 안내] 응시자님의 검사 재개를 위해 지속해서 연락을 드렸으나 연락이 닿지 않아 문자 드립니다. 문자를 확인하시면 프로그램 재접속 및 발신 번호로 신속히 연락 바랍니다.
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Paper radius={"md"} bg={"gray.1"} p={"md"}>
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"} w={50}>
                    발송시간
                  </Text>
                  <Value content={"2025-06-02 오전 10:41:46	"} />
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
                    <Value content={"010-3232-1212"} />
                  </Group>
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      회신번호
                    </Text>
                    <Value content={"010-3232-1212"} />
                  </Group>
                </Stack>
              </Group>
              <Group gap={"xs"} align="start">
                <Text fz={"xs"} c={"gray"} w={50}>
                  내용
                </Text>
                <Text flex={1} fz={"xs"}>
                  [온라인 인적성검사 안내] 응시자님의 검사 재개를 위해 지속해서 연락을 드렸으나 연락이 닿지 않아 문자 드립니다. 문자를 확인하시면 프로그램 재접속 및 발신 번호로 신속히 연락 바랍니다.
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Paper radius={"md"} bg={"gray.1"} p={"md"}>
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"} w={50}>
                    발송시간
                  </Text>
                  <Value content={"2025-06-02 오전 10:41:46	"} />
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
                    <Value content={"010-3232-1212"} />
                  </Group>
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      회신번호
                    </Text>
                    <Value content={"010-3232-1212"} />
                  </Group>
                </Stack>
              </Group>
              <Group gap={"xs"} align="start">
                <Text fz={"xs"} c={"gray"} w={50}>
                  내용
                </Text>
                <Text flex={1} fz={"xs"}>
                  [온라인 인적성검사 안내] 응시자님의 검사 재개를 위해 지속해서 연락을 드렸으나 연락이 닿지 않아 문자 드립니다. 문자를 확인하시면 프로그램 재접속 및 발신 번호로 신속히 연락 바랍니다.
                </Text>
              </Group>
            </Stack>
          </Paper>
          <Paper radius={"md"} bg={"gray.1"} p={"md"}>
            <Stack gap={"xs"}>
              <Group justify="space-between">
                <Group gap={"xs"}>
                  <Text fz={"xs"} c={"gray"} w={50}>
                    발송시간
                  </Text>
                  <Value content={"2025-06-02 오전 10:41:46	"} />
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
                    <Value content={"010-3232-1212"} />
                  </Group>
                  <Group gap={"xs"}>
                    <Text fz={"xs"} c={"gray"} w={50}>
                      회신번호
                    </Text>
                    <Value content={"010-3232-1212"} />
                  </Group>
                </Stack>
              </Group>
              <Group gap={"xs"} align="start">
                <Text fz={"xs"} c={"gray"} w={50}>
                  내용
                </Text>
                <Text flex={1} fz={"xs"}>
                  [온라인 인적성검사 안내] 응시자님의 검사 재개를 위해 지속해서 연락을 드렸으나 연락이 닿지 않아 문자 드립니다. 문자를 확인하시면 프로그램 재접속 및 발신 번호로 신속히 연락 바랍니다.
                </Text>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </ScrollArea>
    </Modal>
  );
};

export default SmsDetailsModal;
