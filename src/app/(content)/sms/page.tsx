"use client";
import PageContainer from "@/components/Global/container";
import SmsDetails from "@/components/sms/details";
import SmsDetailsModal from "@/components/sms/details/modal";
import { ActionIcon, Button, Grid, GridCol, Group, Input, Paper, ScrollArea, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconUpload, IconX } from "@tabler/icons-react";
import React from "react";

const SMS = () => {
  // const [opened, { open, close }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageContainer>
      <Group justify="space-between" align="end">
        <Stack gap={1}>
          <Text size="lg" fw={600} component="a">
            안내 SMS 전송
          </Text>
          <Text component="span" c={"gray.6"} fz={"sm"}>
            안내 SMS 전송 및 현황을 확인할 수 있습니다.
          </Text>
        </Stack>
      </Group>
      <Grid mt={"md"}>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap={2}>
            <Group justify="space-between" align="end">
              <Text fz={"sm"}>발신정보</Text>
              <Button variant="outline" size="xs" onClick={open} hiddenFrom="md">
                내역
              </Button>
            </Group>
            <Paper p={"lg"}>
              <Textarea
                styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-6)" } }}
                placeholder="안내 문구를 입력해 주세요."
                autosize
                label="안내문구"
                minRows={5}
                maxRows={10}
              />
              <TextInput styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-6)" } }} placeholder="010-0000-0000" label="회신번호" />
            </Paper>
          </Stack>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Stack gap={2}>
            <Text fz={"sm"}>수신정보</Text>
            <Paper p={"lg"}>
              <Group wrap="nowrap" align="end" mb={"md"}>
                <TextInput flex={1} styles={{ label: { fontSize: "var(--mantine-font-size-xs)", color: "var(--mantine-color-gray-6)" } }} placeholder="010-0000-0000" label="수신번호" />
                <Group>
                  <Button variant="light">추가</Button>
                  <ActionIcon size="input-sm" variant="light" onClick={() => alert("엑셀 업로드??")}>
                    <IconUpload size={18} />
                  </ActionIcon>
                </Group>
              </Group>
              <Text fw={500} fz={"sm"}>
                총 5명
              </Text>
              <Paper withBorder p="sm">
                <ScrollArea h={150}>
                  <Stack gap={5}>
                    <Group>
                      <Text fz={"xs"}>1. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text fz={"xs"}>2. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text fz={"xs"}>3. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text fz={"xs"}>4. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text fz={"xs"}>5. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                    <Group>
                      <Text fz={"xs"}>6. 010-2121-1212</Text>
                      <ActionIcon variant="subtle">
                        <IconX size={14} strokeWidth={1.4} color="gray" />
                      </ActionIcon>
                    </Group>
                  </Stack>
                </ScrollArea>
              </Paper>
              <Button fullWidth mt={"md"}>
                전송
              </Button>
            </Paper>
          </Stack>
        </GridCol>
      </Grid>
      <SmsDetails />
      <SmsDetailsModal opened={opened} close={close} />
    </PageContainer>
  );
};

export default SMS;
