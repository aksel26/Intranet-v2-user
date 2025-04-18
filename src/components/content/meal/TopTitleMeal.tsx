import { myInfoStore } from "@/lib/store/myInfoStore";
import { Box, Flex, Group, Loader, Paper, Stack, Text } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import dayjs from "dayjs";
import Rule from "./Rule";
// import Rule from "./rule";

export const TopTitleMeal = ({ stats, isLoading }: any) => {
  const { myInfo } = myInfoStore();
  if (isLoading)
    return (
      <Group justify="center" py={"xl"}>
        <Loader color="blue" type="dots" />
      </Group>
    );
  return (
    <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
      <Stack gap={"md"}>
        <Box>
          <Text size="xl" fw={700}>
            식대
          </Text>
          <Text size="sm" fw={500} c={"gray.6"}>
            {dayjs().format("MM월 DD일 dddd")}
          </Text>
        </Box>
        <Group justify="space-between" align={"end"}>
          <Flex direction={"column"} rowGap={5}>
            <Text fw={600} c={"blue.9"} fz={"lg"}>
              {myInfo.userName || ""}
              <Text c={"gray.9"} component="span" mr={0} fz={"sm"}>
                님의 잔여 식대는
              </Text>
            </Text>

            <Flex align={"center"}>
              <Text mx={5} component="span" c={"blue.9"} fw={600} fz={"lg"} styles={{ root: { letterSpacing: 0.8 } }}>
                <NumberFlow
                  value={stats.mealBalance}
                  locales="ko-KR" // Intl.NumberFormat locales
                />
              </Text>
              <Text fz={"sm"}>원 입니다</Text>
            </Flex>
          </Flex>
          <Rule />
        </Group>
        {/* <ChartSummary statsInfo={statsInfo} /> */}
      </Stack>
    </Paper>
  );
};
