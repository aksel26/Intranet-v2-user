import { Button, Divider, Group, Popover, Stack, Text } from "@mantine/core";
import { IconClick } from "@tabler/icons-react";
import React from "react";

function Rule() {
  return (
    <Popover width={"auto"} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button size="xs" leftSection={<IconClick size={18} />} variant="subtle">
          식대 기준 알아보기
        </Button>
      </Popover.Target>
      <Popover.Dropdown py={"md"}>
        <Group>
          <Stack>
            <Text fz={"sm"}>평일근무</Text>
            <Stack gap={2}>
              <Text fz={"sm"}>ACG 본사</Text>
              <Group align="start">
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>0</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>근무일 당 10,000원</Text>
                  {/* <Text fz={"xs"}>(월 근무일 * 10,000원)</Text> */}
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Stack>
              </Group>
            </Stack>
            <Stack gap={2}>
              <Text fz={"sm"}>외근(출장)</Text>
              <Group>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>9,000원</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Stack>
              </Group>
            </Stack>
          </Stack>

          <Divider orientation="vertical" />
          <Stack>
            <Text fz={"sm"}>주말근무</Text>
            <Stack gap={2}>
              <Text fz={"sm"}>ACG 본사</Text>
              <Group>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>0</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Stack>
              </Group>
            </Stack>
            <Stack gap={2}>
              <Text fz={"sm"}>외근(출장)</Text>
              <Group>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>9,000원</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Stack>
                <Stack gap={1}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Stack>
              </Group>
            </Stack>
          </Stack>
        </Group>
        <Text size={"xs"} mt={"xs"} fw={500} c={"dimmed"} ta={"right"}>
          2024년 1월 1일 기준
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export default Rule;
