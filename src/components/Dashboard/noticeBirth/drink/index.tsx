import { monthlyDrink } from "@/app/api/get/getApi";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import notification from "@/components/GNB/Notification";
import { useUpdateDrink } from "@/hooks/useSubmitForm";
import { mainDateStore } from "@/lib/store/mainDateStore";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { Box, Button, Divider, Group, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronRight } from "@tabler/icons-react";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Details from "./details";

const MonthlyDrink = () => {
  const { myInfo } = myInfoStore();
  const queryClient = useQueryClient();
  const { dateValue } = mainDateStore();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["monthlyDrink", { month: dayjs(dateValue).month() + 1 }],
    queryFn: () => monthlyDrink({ month: (dayjs(dateValue).month() + 1).toString() }).then((res) => res.data),
  });
  const { mutate } = useUpdateDrink();

  const config = data?.data.config;
  const myBaverage = data?.data.myBaverage;
  const details = data?.data.details;

  const updateDrink = (value: any) => {
    if (!myInfo) return;
    const params = {
      configId: config.configId,
      userName: myInfo.userName,
      baverage: value,
    };
    mutate(params, {
      onSuccess: async () => {
        notification({
          title: "음료 신청",
          message: "음료 신청이 완료되었습니다.",
          color: "green",
        });
        await queryClient.invalidateQueries({ queryKey: ["monthlyDrink"] });
      },
      onError: (error) => {
        notification({
          title: "음료 신청",
          message: "음료 신청 중 문제가 발생했습니다.",
          color: "red",
        });
        console.error("Error updating drink:", error);
      },
    });
  };
  if (isLoading) return <LoadingView />;
  if (isError) return <ErrorView />;
  return (
    <Box px={"md"} pt={"xs"}>
      <Group justify="space-between" align="center">
        <Text fz={"xs"} fw={400}>
          <Text component="span" fw={500} fz={"xs"}>
            {config?.month}월{" "}
          </Text>
          Monthly Meeting 음료 신청
        </Text>

        <Group>
          <Text fz={"xs"} c={"gray"}>
            작성기한
          </Text>
          <Text fz={"xs"}>{config?.dueDate}</Text>
        </Group>
      </Group>
      <Box mt={"md"}>
        <Select
          variant="unstyled"
          size="sm"
          styles={{ option: { fontSize: "var(--mantine-font-size-xs)" } }}
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
          <Text fz={"xs"} c={"gray"}>
            픽업 :
          </Text>
          <Group>
            {config?.pickup.length < 1 ? (
              <Text fz={"xs"} c={"gray"}>
                픽업 인원이 베정되지 않았습니다
              </Text>
            ) : (
              config?.pickup.map((item: any, index: number) => (
                <Text key={index} fz={"xs"}>
                  {item}
                </Text>
              ))
            )}
          </Group>
        </Group>
        <Button size="compact-xs" variant="subtle" rightSection={<IconChevronRight size={15} strokeWidth={1.2} />} onClick={open}>
          전체보기
        </Button>
      </Group>

      <Details opened={opened} close={close} details={details} configId={config.configId} />
    </Box>
  );
};

export default MonthlyDrink;
