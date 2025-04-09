"use client";
import notification from "@/components/GNB/Notification";
import SearchableSelect from "@/components/SearchableSelect";
import { useDeleteMeals, useSubmitFormMeal } from "@/hooks/useSubmitForm";
import { Button, Drawer, Flex, Group, NumberInput, Stack, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useState } from "react";

dayjs.locale("ko");

// Types
type MealType = string | null;

interface MealData {
  payerName: string;
  place: string;
  amount: number | null;
  attendance?: string;
}

interface FormValues {
  targetDay: string | Date;
  breakfast: MealData;
  dinner: MealData;
  lunch: MealData;
}

// Constants

const DEFAULT_MEAL_DATA: MealData = {
  payerName: "",
  place: "",
  amount: null,
};

// Component
const ModalInputForm = ({ opened, close, date, targetList }: any) => {
  const [currentTab, setCurrentTab] = useState<MealType>("lunch");

  const queryClient = useQueryClient();
  const { mutate } = useSubmitFormMeal();
  const { mutate: deleteMeal } = useDeleteMeals();
  // console.log("🫠", data);
  const form = useForm<FormValues>({
    initialValues: {
      targetDay: dayjs(date).format("YYYY-MM-DD"),
      breakfast: DEFAULT_MEAL_DATA,
      lunch: DEFAULT_MEAL_DATA,
      dinner: DEFAULT_MEAL_DATA,
    },
  });

  // initialData가 변경될 때 form 값을 업데이트
  useEffect(() => {
    if (targetList) {
      form.setValues({
        targetDay: targetList.start,
        breakfast: targetList.breakfast,
        lunch: targetList.lunch,
        dinner: targetList.dinner,
      });
    } else {
      setCurrentTab("lunch");
      form.setValues({
        targetDay: dayjs(date).format("YYYY-MM-DD"),
        breakfast: DEFAULT_MEAL_DATA,
        lunch: DEFAULT_MEAL_DATA,
        dinner: DEFAULT_MEAL_DATA,
      });
    }
  }, [date, targetList]);

  const handleSubmit = (values: FormValues) => {
    console.log("🚀 ~ handleSubmit ~ values:", values);
    mutate(values, {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["meals"] });
        notification({
          title: "식대 입력",
          color: "green",
          message: "식대 내역이 저장되었습니다.",
        });
        form.reset();
        setCurrentTab("lunch");
        close();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
        notification({ title: "식대 입력", color: "red", message: errorMessage });
      },
    });
  };

  const reset = () => {
    deleteMeal(dayjs(date).format("YYYY-MM-DD"), {
      onSuccess: async () => {
        await queryClient.invalidateQueries({ queryKey: ["meals"] });
        notification({
          title: "식대 내역 삭제",
          message: "정상적으로 삭제되었습니다.",
          color: "green",
        });
        close();
      },
    });
  };

  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });

  return (
    <Drawer
      offset={12}
      radius="md"
      opened={opened}
      onClose={close}
      position="bottom"
      styles={{
        content: {
          height: "auto",
          minWidth: 350,
          flex: matches ? 1 : "none",
        },
        inner: { justifyContent: "center" },
      }}
      title={
        <Flex align="end" columnGap="sm">
          <Text fw={600} size="md">
            식대 입력
          </Text>
          <Text c="gray.7" size="xs">
            {dayjs(date).format("MM월 DD일 dddd")}
          </Text>
        </Flex>
      }
    >
      <Flex direction="column" rowGap={10} className="modal-parent-portal">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Tabs defaultValue={currentTab || "lunch"} onChange={setCurrentTab}>
            <Tabs.List grow>
              <Tabs.Tab value="breakfast" styles={{ tabLabel: { fontSize: "var(--mantine-font-size-xs)" } }}>
                조식
              </Tabs.Tab>
              <Tabs.Tab value="lunch" styles={{ tabLabel: { fontSize: "var(--mantine-font-size-xs)" } }}>
                중식
              </Tabs.Tab>
              <Tabs.Tab value="dinner" styles={{ tabLabel: { fontSize: "var(--mantine-font-size-xs)" } }}>
                석식
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="breakfast">
              <Stack gap={"xs"} py={"md"}>
                <SearchableSelect form={form} formKey={"breakfast.payerName"} type={currentTab} />
                <TextInput
                  label="식당명"
                  placeholder="식당명을 입력해 주세요."
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("breakfast.place")}
                  {...form.getInputProps("breakfast.place")}
                />
                <NumberInput
                  label="금액"
                  placeholder="금액을 입력해 주세요."
                  hideControls
                  thousandSeparator
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("breakfast.amount")}
                  {...form.getInputProps("breakfast.amount")}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="lunch">
              <Stack gap={"xs"} py={"md"}>
                <SearchableSelect form={form} formKey={"lunch.payerName"} type={currentTab} />
                <TextInput
                  label="식당명"
                  placeholder="식당명을 입력해 주세요."
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("lunch.place")}
                  {...form.getInputProps("lunch.place")}
                />
                <NumberInput
                  label="금액"
                  placeholder="금액을 입력해 주세요."
                  thousandSeparator
                  hideControls
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("lunch.amount")}
                  {...form.getInputProps("lunch.amount")}
                />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="dinner">
              <Stack gap={"xs"} py={"md"}>
                <SearchableSelect form={form} formKey={"dinner.payerName"} type={currentTab} />
                <TextInput
                  label="식당명"
                  placeholder="식당명을 입력해 주세요."
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("dinner.place")}
                  {...form.getInputProps("dinner.place")}
                />
                <NumberInput
                  label="금액"
                  placeholder="금액을 입력해 주세요."
                  thousandSeparator
                  hideControls
                  styles={{ label: { fontSize: "var(--mantine-font-size-xs)" } }}
                  key={form.key("dinner.amount")}
                  {...form.getInputProps("dinner.amount")}
                />
              </Stack>
            </Tabs.Panel>
          </Tabs>

          <Group wrap="nowrap">
            <Button fullWidth type="submit">
              저장하기
            </Button>
            {targetList && (
              <Button fullWidth color="red" variant="light" onClick={reset}>
                내역 지우기
              </Button>
            )}
          </Group>
        </form>
      </Flex>
    </Drawer>
  );
};

ModalInputForm.displayName = "ModalInputForm";

export default ModalInputForm;
