"use client";

import notification from "@/components/GNB/Notification";
import { useSubmitFormMeal } from "@/hooks/useSubmitForm";
import { ATTENDANCE_OPTIONS } from "@/lib/enums";
import { Button, Drawer, Flex, NumberInput, Select, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
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
  attendance: string;
  breakfast: MealData;
  dinner: MealData;
  lunch: MealData;
}

interface ModalInputFormProps {
  opened: boolean;
  date: string;
  close: () => void;
}

// Constants

const PAYER_OPTIONS = ["김정현", "이혜빈", "이혜빈2", "이혜빈3", "이혜빈4", "이혜빈5", "윤용설", "신효은", "이승현", "김현민"];
const DEFAULT_MEAL_DATA: MealData = {
  payerName: "",
  place: "",
  amount: null,
};

// Component
const ModalInputForm = forwardRef<HTMLDivElement, ModalInputFormProps>(({ opened, close, date }, ref) => {
  const [openedModal, setOpenedModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentTab, setCurrentTab] = useState<MealType>("lunch");

  const innerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { mutate } = useSubmitFormMeal();

  const form = useForm<FormValues>({
    initialValues: {
      targetDay: date,
      attendance: "근무",
      breakfast: DEFAULT_MEAL_DATA,
      lunch: DEFAULT_MEAL_DATA,
      dinner: DEFAULT_MEAL_DATA,
    },
  });

  useEffect(() => {
    form.setFieldValue("targetDay", dayjs(date).format("YYYY-MM-DD"));
  }, [date]);

  const handleSubmit = (values: FormValues) => {
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

  const handlePayerSelect = (value: string) => {
    form.setFieldValue(`${currentTab}.payerName`, value);
    setOpenedModal(false);
    setSearchValue("");
    setIsActive(false);
  };
  const matches = useMediaQuery("(max-width: 40em)", true, {
    getInitialValueInEffect: false,
  });
  const renderAttendanceSelect = () => {
    if (currentTab !== "lunch") return null;

    return (
      <Select
        label="근태"
        placeholder="근태 유형을 선택해 주세요."
        data={ATTENDANCE_OPTIONS}
        searchable
        comboboxProps={{ withinPortal: false }}
        styles={{ dropdown: { zIndex: 1001 } }}
        {...form.getInputProps("attendance")}
      />
    );
  };

  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  }, [ref]);

  const renderMealForm = () => (
    <Flex direction="column" rowGap={10} py="md">
      {renderAttendanceSelect()}
      <Select
        label="결제자"
        placeholder="결제자를 선택해 주세요."
        data={PAYER_OPTIONS}
        searchable
        value={form.values[currentTab].payerName}
        onChange={(value: string | null) => handlePayerSelect(value!)}
        searchValue={searchValue}
        onSearchChange={(newValue: string) => {
          setSearchValue(newValue);
          if (isActive) setOpenedModal(true);
        }}
        comboboxProps={{ withinPortal: false }}
        maxDropdownHeight={180}
        styles={{
          dropdown: { position: "absolute", zIndex: 1000 },
          input: { cursor: "pointer" },
        }}
        dropdownOpened={openedModal && isActive}
        onDropdownClose={() => {
          setOpenedModal(false);
          setSearchValue("");
        }}
        onClick={() => {
          setIsActive(true);
          setOpenedModal(true);
        }}
        onBlur={() => {
          if (!form.values[currentTab].payerName) setIsActive(false);
        }}
      />
      <TextInput label="식당명" placeholder="식당 상호명을 입력해 주세요." {...form.getInputProps(`${currentTab}.place`)} />
      <NumberInput
        label="금액"
        placeholder="금액을 입력해 주세요."
        thousandSeparator=","
        hideControls
        suffix=" 원"
        {...form.getInputProps(`${currentTab}.amount`)}
      />
    </Flex>
  );

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
            <Tabs.Panel value={currentTab}>{renderMealForm()}</Tabs.Panel>
            <Button fullWidth type="submit">
              저장하기
            </Button>
          </Tabs>
        </form>
      </Flex>
    </Drawer>
  );
});

ModalInputForm.displayName = "ModalInputForm";

export default ModalInputForm;
