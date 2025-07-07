import useCopyBankAccount from "@/hooks/useCopyBankAccount";
import { Box, Button, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import NumberFlow from "@number-flow/react";
// import { IconCopy } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Copy } from "lucide-react";

export const ToptitleActivity = ({ stats, isLoading, isError }: any) => {
  const { copyBankAccount } = useCopyBankAccount();

  const renderContent = () => {
    // if (isLoading) return <LoadingView />;
    // if (isError) return <ErrorView>활동비 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
    return (
      <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
        <Stack gap={"md"}>
          <Box>
            <Title order={4}>활동비</Title>
            <Text size="sm" fw={500} c={"gray.6"}>
              {dayjs().format("MM월 DD일 dddd")}
            </Text>
          </Box>
          <Group justify="space-between" align={"end"}>
            <Stack gap={3}>
              <Group gap={8}>
                <Text fw={500} c={"beige.7"} fz={"lg"}>
                  {stats?.hqName || ""}
                  <Text c={"gray.9"} component="span" ml={4} fz={"sm"}>
                    의 잔여 활동비는
                  </Text>
                </Text>
                <Flex align={"end"}>
                  <Text component="span" c={"beige.7"} fw={500} fz={"lg"} styles={{ root: { letterSpacing: 0.8 } }} mr={2}>
                    <NumberFlow
                      transformTiming={{ duration: 750, easing: "ease-out" }}
                      spinTiming={{ duration: 750, easing: "ease-out" }}
                      opacityTiming={{ duration: 350, easing: "ease-out" }}
                      value={stats?.activityBalance || 0}
                      suffix="원 "
                      locales="ko-KR" // Intl.NumberFormat locales
                    />
                  </Text>
                  <Text fz={"sm"}>입니다.</Text>
                </Flex>
              </Group>
              <Group gap={8}>
                <Text fw={500} c={"beige.7"} fz={"lg"}>
                  {stats?.teamName || ""}팀
                  <Text c={"gray.9"} component="span" ml={4} fz={"sm"}>
                    의 잔여 활동비는
                  </Text>
                </Text>
                <Flex align={"end"}>
                  <Text component="span" c={"beige.7"} fw={500} fz={"lg"} styles={{ root: { letterSpacing: 0.8 } }} mr={2}>
                    <NumberFlow
                      transformTiming={{ duration: 750, easing: "ease-out" }}
                      spinTiming={{ duration: 750, easing: "ease-out" }}
                      opacityTiming={{ duration: 350, easing: "ease-out" }}
                      value={stats?.activityBalance || 0}
                      suffix="원 "
                      locales="ko-KR" // Intl.NumberFormat locales
                    />
                  </Text>
                  <Text fz={"sm"}>입니다.(☝️ Fetching 전)</Text>
                </Flex>
              </Group>
            </Stack>
            <Button size="xs" variant="subtle" leftSection={<Copy size={18} />} onClick={copyBankAccount}>
              입금계좌 복사하기
            </Button>
          </Group>
        </Stack>
        {/* <ChartSummary statsInfo={statsInfo} /> */}
      </Paper>
    );
  };
  return <>{renderContent()}</>;
};
