// import { ErrorView } from "@/components/Global/view/ErrorView";
// import LoadingView from "@/components/Global/view/LoadingView";
// import { myInfoStore } from "@/lib/store/myInfoStore";
import { ErrorView } from "@/components/global/error";
import LoadingView from "@/components/loading";
import useCopyBankAccount from "@/hooks/useCopyBankAccount";
// import useCopyBankAccount from "@/hooks/useCopyBankAccount";
import { myInfoStore } from "@/store/myInfoStore";
import { Button, Flex, Group, Paper, Stack, Text, Title } from "@mantine/core";
import NumberFlow from "@number-flow/react";
import { Copy } from "lucide-react";
// import Rule from "./rule";

export const TopTitleMeal = ({ stats, isLoading, isError }: any) => {
  const { myInfo } = myInfoStore();
  const { copyBankAccount } = useCopyBankAccount();

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>식대 조회를 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (myInfo) {
      return (
        <Paper bg={"white"} px="md" py="lg" radius={"lg"}>
          <Stack gap={"md"}>
            <Title order={4}>식대</Title>

            <Group justify="space-between" align={"end"}>
              <Flex direction={"column"} rowGap={5}>
                <Text fw={500} c={"blue.9"} fz={"lg"}>
                  {myInfo.userName || ""}
                  <Text c={"gray.9"} component="span" mr={0} fz={"sm"}>
                    님의
                    <Text fw={500} c={"blue.9"} fz={"lg"} component="span" mx={5}>
                      {stats?.month}월
                    </Text>
                    잔여 식대는
                  </Text>
                </Text>

                <Flex align={"center"}>
                  <Text mx={5} component="span" c={"blue.9"} fw={500} fz={"lg"} styles={{ root: { letterSpacing: 0.8 } }}>
                    <NumberFlow
                      transformTiming={{ duration: 750, easing: "ease-out" }}
                      spinTiming={{ duration: 750, easing: "ease-out" }}
                      opacityTiming={{ duration: 350, easing: "ease-out" }}
                      value={stats?.mealBalance}
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
            {/* <ChartSummary statsInfo={statsInfo} /> */}
          </Stack>
        </Paper>
      );
    }
  };

  return <>{renderContent()}</>;
};
