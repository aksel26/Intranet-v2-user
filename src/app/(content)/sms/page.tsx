import PageContainer from "@/components/Global/container";
import { ActionIcon, Button, Grid, GridCol, Group, Input, Paper, ScrollArea, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import React from "react";

const SMS = () => {
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
      <Grid>
        <GridCol span={{ base: 12, md: 6 }}>
          <Paper p={"lg"}>
            <Textarea placeholder="안내 문구를 입력해 주세요." autosize label="안내문구" minRows={5} maxRows={10} />
            <TextInput placeholder="010-0000-0000" label="회신번호" />
          </Paper>
        </GridCol>
        <GridCol span={{ base: 12, md: 6 }}>
          <Paper p={"lg"}>
            <Group wrap="nowrap" align="end">
              <TextInput w={"100%"} placeholder="010-0000-0000" label="수신번호" />
              <Button>추가</Button>
            </Group>
            <Text fz={"sm"}>총 : 5명</Text>
            <Paper withBorder p="sm">
              <ScrollArea h={200}>
                <Stack gap={"xs"}>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                  <Group>
                    <Text fz={"xs"}>010-2121-1212</Text>
                    <ActionIcon variant="subtle">
                      <IconX size={14} strokeWidth={1.4} color="gray" />
                    </ActionIcon>
                  </Group>
                </Stack>
              </ScrollArea>
            </Paper>
          </Paper>
        </GridCol>
      </Grid>
    </PageContainer>
  );
};

export default SMS;
