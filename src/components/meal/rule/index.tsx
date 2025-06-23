import { Button, Divider, Group, Popover, Stack, Text } from "@mantine/core";
import { MousePointerClick } from "lucide-react";
// import { IconClick } from "@tabler/icons-react";

function Rule() {
  return (
    <Popover width={"auto"} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button size="xs" leftSection={<MousePointerClick size={18} />} variant="subtle">
          식대 기준 알아보기
        </Button>
      </Popover.Target>
      <Popover.Dropdown py={"md"}>
        <Group align="start">
          <Stack>
            <Text fz={"sm"}>평일근무</Text>
            <Stack gap={"xs"}>
              <Text fz={"xs"}>ACG 본사</Text>
              <Stack align="start" gap={2}>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>0</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원 * 근무일</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Group>
              </Stack>
            </Stack>
            <Stack gap={"xs"}>
              <Text fz={"xs"}>외근(출장)</Text>
              <Stack gap={2}>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>9,000원</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Group>
              </Stack>
            </Stack>
          </Stack>

          <Divider orientation="vertical" />
          <Stack>
            <Text fz={"sm"}>주말근무</Text>
            <Stack gap={"xs"}>
              <Text fz={"xs"}>ACG 본사</Text>
              <Stack gap={2}>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>0</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Group>
              </Stack>
            </Stack>
            <Stack gap={"xs"} w={133}>
              <Text fz={"xs"}>외근(출장)</Text>
              <Stack gap={2}>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    조식
                  </Text>
                  <Text fz={"xs"}>9,000원</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    중식
                  </Text>
                  <Text fz={"xs"}>10,000원</Text>
                </Group>
                <Group gap={"xs"}>
                  <Text c={"dimmed"} fz={"xs"}>
                    석식
                  </Text>
                  <Text fz={"xs"}>11,000원</Text>
                </Group>
              </Stack>
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
