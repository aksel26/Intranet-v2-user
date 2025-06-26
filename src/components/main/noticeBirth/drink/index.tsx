import { Box, Button, Divider, Group, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { useApiMutation, useApiQuery } from "@/api/useApi";
import { drinkService } from "@/api/services/drink/drink.services";
import notification from "@/components/common/notification";
import LoadingView from "@/components/loading";
import { ErrorView } from "@/components/common/error";
import { ChevronRight } from "lucide-react";
import { myInfoStore } from "@/store/myInfoStore";
import { mainDateStore } from "@/store/mainDateStore";
import DrinkList from "./list";
import { useQueryClient } from "@tanstack/react-query";

const MonthlyDrink = () => {
  const { myInfo } = myInfoStore();
  const queryClient = useQueryClient();
  //   const queryClient = useQueryClient();
  const { dateValue } = mainDateStore();
  const [opened, { open, close }] = useDisclosure(false);

  const { data, isLoading, isError } = useApiQuery(["monthlyDrink", { month: dayjs(dateValue).month() + 1 }], () =>
    drinkService.getDrinks({
      month: (dayjs(dateValue).month() + 1).toString(),
    })
  );

  //   const { mutate } = useUpdateDrink();

  const { mutate } = useApiMutation<
    any, // 응답 타입
    any, // 에러 타입
    any // 요청 파라미터 타입
  >(drinkService.updateDrink, {
    invalidateKeys: [["monthlyDrink"]],
    onSuccess: async () => {
      notification({
        title: "음료 신청",
        message: "음료 신청이 완료되었습니다.",
        color: "green",
      });
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          const targetKeys = ["monthlyDrink"];
          return Array.isArray(queryKey) && targetKeys.includes(queryKey[0]);
        },
      });
    },
    onError: () => {
      notification({
        title: "음료 신청",
        message: "음료 신청 중 문제가 발생했습니다.",
        color: "red",
      });
    },
  });

  const config = data?.data.data.config;
  const myBaverage = data?.data.data.myBaverage;
  const details = data?.data.data.details;

  const updateDrink = (value: any) => {
    if (!myInfo) return;
    const params = {
      configId: config.configId,
      userName: myInfo.userName,
      baverage: value,
    };
    mutate(params);
  };
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  return (
    <Box px={"md"} pt={"xs"}>
      <Group justify="space-between" align="center">
        <Text fz={"sm"} fw={400}>
          <Text component="span" fw={500} fz={"sm"}>
            {config?.month}월{" "}
          </Text>
          Monthly Meeting 음료 신청
        </Text>

        <Group gap={"xs"}>
          <Text fz={"sm"} c={"gray"}>
            작성기한
          </Text>
          <Text fz={"sm"}>{config?.dueDate}</Text>
        </Group>
      </Group>
      <Box mt={"xs"}>
        <Select
          variant="unstyled"
          size="sm"
          styles={{ option: { fontSize: "var(--mantine-font-size-sm)" } }}
          // flex={1}
          w={200}
          value={myBaverage}
          onChange={(value) => updateDrink(value)}
          data={["HOT 아메리카노", "ICE 아메리카노", "HOT 디카페인 아메리카노", "ICE 디카페인 아메리카노", "바닐라크림 콜드브루", "ICE 자몽허니블랙티", "선택안함"]}
          // fz={"xsm"}
          placeholder="음료를 선택해 주세요."
        />
      </Box>
      <Divider my={"xs"} size={0.5} />
      <Group justify="space-between" align="center">
        <Group>
          <Text fz={"sm"} c={"gray"}>
            🏃‍♀️‍➡️ 픽업 :
          </Text>
          <Group>
            {config?.pickup.length < 1 ? (
              <Text fz={"sm"} c={"gray"}>
                픽업 인원이 베정되지 않았습니다
              </Text>
            ) : (
              config?.pickup.map((item: any, index: number) => (
                <Text key={index} fz={"sm"}>
                  {item}
                </Text>
              ))
            )}
          </Group>
        </Group>
        <Button size="compact-xs" variant="subtle" rightSection={<ChevronRight size={15} strokeWidth={1.2} />} onClick={open}>
          전체보기
        </Button>
      </Group>

      <DrinkList opened={opened} close={close} details={details} configId={config.configId} />
    </Box>
  );
};

export default MonthlyDrink;
