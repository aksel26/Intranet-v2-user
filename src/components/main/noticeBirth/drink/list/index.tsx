// import notification from "@/components/GNB/Notification";
import { drinkService } from "@/api/services/drink/drink.services";
import { useApiMutation } from "@/api/useApi";
import notification from "@/components/global/notification";
// import { useUpdateDrink } from "@/hooks/useSubmitForm";
import { Group, Modal, Select, Stack, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";

const DrinkList = ({ opened, close, details, configId }: any) => {
  const queryClient = useQueryClient();
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

  //   const queryClient = useQueryClient();
  //   const { mutate } = useUpdateDrink();
  const updateDrink = (value: any, info: any) => {
    const params = {
      configId: configId,
      userName: info.userName,
      baverage: value,
    };
    mutate(params);
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Monthly Meeting 음료 신청 현황"
      centered
      size={"sm"}
    >
      <Stack gap={1}>
        {details.map((item: any, index: number) => (
          <Group key={index} wrap="nowrap">
            <Text w={15} fz={"sm"}>
              {index + 1}.
            </Text>
            <Text fz={"sm"}>{item.userName}</Text>
            <Select
              variant="unstyled"
              size="sm"
              flex={1}
              value={item.baverage}
              onChange={(value) => updateDrink(value, item)}
              styles={{ option: { fontSize: "var(--mantine-font-size-sm)" } }}
              data={[
                "HOT 아메리카노",
                "ICE 아메리카노",
                "HOT 디카페인 아메리카노",
                "ICE 디카페인 아메리카노",
                "바닐라크림 콜드브루",
                "ICE 자몽허니블랙티",
                "선택안함",
              ]}
              fz={"sm"}
              placeholder="음료를 선택해 주세요."
            />
          </Group>
        ))}
      </Stack>
    </Modal>
  );
};

export default DrinkList;
