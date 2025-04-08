"use client";
import * as api from "@/app/api/get/getApi";
import notification from "@/components/GNB/Notification";
import { useSubmitFormMeal } from "@/hooks/useSubmitForm";
import { ATTENDANCE_OPTIONS } from "@/lib/enums";
import { Button, Drawer, Flex, NumberInput, Select, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { forwardRef, useEffect, useRef, useState } from "react";

dayjs.locale("ko");

// Types
type MealType = "breakfast" | "lunch" | "dinner";

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

interface ModalInputFormProps {
  opened: boolean;
  date: string;
  close: () => void;
  targetList: any;
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

  console.log(targetList);
  const queryClient = useQueryClient();
  const { mutate } = useSubmitFormMeal();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: () => api.getUsers(),
  });

  const users = data?.data?.data;

  console.log("🫠", data);
  const form = useForm<FormValues>({
    initialValues: {
      targetDay: date,
      breakfast: DEFAULT_MEAL_DATA,
      lunch: DEFAULT_MEAL_DATA,
      dinner: DEFAULT_MEAL_DATA,
    },
  });

  useEffect(() => {
    form.setFieldValue("targetDay", dayjs(date).format("YYYY-MM-DD"));
    if (targetList && targetList.length >= 1) {
      form.setFieldValue("breakfast", targetList[0].breakfast || DEFAULT_MEAL_DATA);
      form.setFieldValue("lunch", targetList[0].lunch || DEFAULT_MEAL_DATA);
      form.setFieldValue("dinner", targetList[0].dinner || DEFAULT_MEAL_DATA);
    }
  }, [targetList, date]);

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

        close();
      },
      onError: (error: Error) => {
        const axiosError = error as AxiosError<{ message: string }>;
        const errorMessage = axiosError.response?.data?.message || "오류가 발생했습니다.";
        notification({ title: "식대 입력", color: "red", message: errorMessage });
      },
    });
  };

  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });

  const RenderMealForm = () => {
    console.log(currentTab);
    return (
      <Flex direction="column" rowGap={10} py="md">
        <Select
          label="결제자"
          placeholder="결제자를 선택해 주세요."
          data={users?.map((user: any) => user.userName)}
          searchable
          styles={{
            dropdown: { position: "absolute", zIndex: 1000 },
            input: { cursor: "pointer" },
          }}
          comboboxProps={{ withinPortal: false }}
          // value={form.values[currentTab].payerName}
          {...form.getInputProps(`${currentTab}.payerName`)}
        />

        <TextInput
          // value={form.values[currentTab].place}
          label="식당명"
          placeholder="식당 상호명을 입력해 주세요."
          {...form.getInputProps(`${currentTab}.place`)}
        />
        <NumberInput
          label="금액"
          placeholder="금액을 입력해 주세요."
          thousandSeparator=","
          hideControls
          suffix=" 원"
          // value={form.values[currentTab].amount}
          {...form.getInputProps(`${currentTab}.amount`)}
        />
      </Flex>
    );
  };

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
          <Tabs
            defaultValue={currentTab}
            onChange={(value: string | null) => setCurrentTab(value as MealType)}
            styles={{ tabLabel: { fontSize: "var(--mantine-font-size-xs)" } }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="breakfast">조식</Tabs.Tab>
              <Tabs.Tab value="lunch">중식</Tabs.Tab>
              <Tabs.Tab value="dinner">석식</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value={currentTab}>
              {/* <RenderMealForm /> */}

              <Flex direction="column" rowGap={10} py="md">
                <Select
                  label="결제자"
                  placeholder="결제자를 선택해 주세요."
                  data={users?.map((user: any) => user.userName)}
                  searchable
                  styles={{
                    dropdown: { position: "absolute", zIndex: 1000 },
                    input: { cursor: "pointer" },
                  }}
                  comboboxProps={{ withinPortal: false }}
                  // value={form.values[currentTab].payerName}
                  {...form.getInputProps(`${currentTab}.payerName`)}
                />
                <TextInput
                  // value={form.values[currentTab].place}
                  label="식당명"
                  placeholder="식당 상호명을 입력해 주세요."
                  {...form.getInputProps(`${currentTab}.place`)}
                />
                <NumberInput
                  label="금액"
                  placeholder="금액을 입력해 주세요."
                  thousandSeparator=","
                  hideControls
                  suffix=" 원"
                  // value={form.values[currentTab].amount}
                  {...form.getInputProps(`${currentTab}.amount`)}
                />
              </Flex>
            </Tabs.Panel>
            <Button fullWidth type="submit">
              저장하기
            </Button>
          </Tabs>
        </form>
      </Flex>
    </Drawer>
  );
};

ModalInputForm.displayName = "ModalInputForm";

export default ModalInputForm;
