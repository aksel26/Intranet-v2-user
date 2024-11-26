"use client";
import ChartComponent from "@/components/content/meal/DoughnutChart";
import { ActionIcon, Box, Collapse, Flex, Group, NumberFormatter, Paper, rem, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ArrowDown from "/public/icons/arrow-down.svg";
const PriceInfo = ({ text, price }: { text: string; price: number | string | undefined }) => {
  return (
    <Flex>
      <Text c={"gray.6"} w={90} size="xs">
        {text}
      </Text>
      <Text component="span" c={"gray.6"} size="xs" styles={{ root: { letterSpacing: 1 } }}>
        <NumberFormatter thousandSeparator value={price} suffix=" 원" />
      </Text>
    </Flex>
  );
};

export const ChartSummary = ({ statsInfo }: any) => {
  const { balance, budget, expenses } = statsInfo;

  const [opened, { toggle }] = useDisclosure(false);

  // const { mealBudget, mealExpense, mealBalance } = mealStore((state) => state.mealInfo.mealStats);
  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Group align="flex-start" justify="space-between">
        <Title order={5}>식대 요약</Title>
        <ActionIcon size={"sm"} variant="transparent" color="gray" onClick={toggle}>
          <ArrowDown />
        </ActionIcon>
      </Group>
      <Collapse in={opened}>
        <Group mt={"md"} gap="xl" justify="space-between">
          <Stack>
            <PriceInfo text="사용가능 금액" price={budget} />
            <PriceInfo text="사용한 금액" price={expenses} />
            <PriceInfo text="남은 금액" price={balance} />
          </Stack>
          <Box p={rem(3)} w={80} h={80}>
            <ChartComponent stats={statsInfo} />
          </Box>
        </Group>
      </Collapse>
    </Paper>
  );
};
