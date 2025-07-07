// import { ErrorView } from "@/components/common/view/ErrorView";
// import LoadingView from "@/components/common/view/LoadingView";
// import useCopyBankAccount from "@/hooks/useCopyBankAccount";
import { ErrorView } from "@/components/common/error";
import LoadingView from "@/components/loading";
import useCopyBankAccount from "@/hooks/useCopyBankAccount";
import { myInfoStore } from "@/store/myInfoStore";
// import { myInfoStore } from "@/lib/store/myInfoStore";
import { Box, Button, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import NumberFlow from "@number-flow/react";
// import { IconCopy } from "@tabler/icons-react";
import dayjs from "dayjs";
import { Copy } from "lucide-react";

export const TopTitleWelfare = ({ stats, isLoading, isError }: any) => {
  const { myInfo } = myInfoStore();
  const { copyBankAccount } = useCopyBankAccount();
  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>복지 포인트 조회를 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (myInfo) {
      return (
        <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
          <Stack gap={"md"}>
            <Box>
              <Title order={4}>복지포인트</Title>
              <Text size="sm" fw={500} c={"gray.6"}>
                {dayjs().format("MM월 DD일 dddd")}
              </Text>
            </Box>
            <Group justify="space-between" align={"end"}>
              <Flex direction={"column"} rowGap={5}>
                <Text fw={500} c={"beige.7"} fz={"lg"}>
                  {myInfo.userName || ""}
                  <Text c={"gray.9"} component="span" ml={4} fz={"sm"}>
                    님의 잔여 복지포인트는
                  </Text>
                </Text>

                <Flex align={"end"}>
                  <Text component="span" c={"beige.7"} fw={500} fz={"lg"} styles={{ root: { letterSpacing: 0.8 } }} mr={2}>
                    <NumberFlow
                      transformTiming={{ duration: 750, easing: "ease-out" }}
                      spinTiming={{ duration: 750, easing: "ease-out" }}
                      opacityTiming={{ duration: 350, easing: "ease-out" }}
                      value={stats?.welfareBalance || 0}
                      suffix="원 "
                      locales="ko-KR" // Intl.NumberFormat locales
                    />
                  </Text>
                  <Text fz={"sm"}>원 입니다</Text>
                </Flex>
              </Flex>
              <Button size="xs" variant="subtle" leftSection={<Copy size={18} />} onClick={copyBankAccount}>
                입금계좌 복사하기
              </Button>
            </Group>
          </Stack>
        </Paper>
      );
    }
  };

  return <>{renderContent()}</>;
};
