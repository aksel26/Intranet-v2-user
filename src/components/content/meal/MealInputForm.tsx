"use client";

import notification from "@/components/GNB/Notification";
import { useSubmitFormMeal } from "@/hooks/useSubmitForm";
import { ATTENDANCE_OPTIONS } from "@/lib/enums";
import { calendarDateStore } from "@/lib/store/calendarDateStore";
import { Button, Flex, Modal, NumberInput, Select, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useQueryClient } from "@tanstack/react-query";
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
const ModalInputForm = forwardRef<HTMLDivElement, ModalInputFormProps>(({ opened, close }, ref) => {
  const [openedModal, setOpenedModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentTab, setCurrentTab] = useState<MealType>("lunch");

  const innerRef = useRef<HTMLDivElement>(null);
  const { calendarDate } = calendarDateStore((state) => state);
  const queryClient = useQueryClient();
  const { mutate } = useSubmitFormMeal();

  const form = useForm<FormValues>({
    initialValues: {
      targetDay: calendarDate,
      attendance: "근무",
      breakfast: DEFAULT_MEAL_DATA,
      lunch: DEFAULT_MEAL_DATA,
      dinner: DEFAULT_MEAL_DATA,
    },
  });

  useEffect(() => {
    form.setFieldValue("targetDay", dayjs(calendarDate).format("YYYY-MM-DD"));
  }, [calendarDate]);

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
    });
  };

  const handlePayerSelect = (value: string) => {
    form.setFieldValue(`${currentTab}.payerName`, value);
    setOpenedModal(false);
    setSearchValue("");
    setIsActive(false);
  };

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
    <Modal
      opened={opened}
      onClose={close}
      size="xl"
      ref={ref}
      zIndex={100}
      radius="md"
      withCloseButton={false}
      title={
        <Flex align="end" columnGap="sm">
          <Text fw={700} size="lg">
            식대 입력
          </Text>
          <Text c="gray.7" size="sm">
            {dayjs(calendarDate).format("MM월 DD일 dddd")}
          </Text>
        </Flex>
      }
      transitionProps={{ transition: "slide-up", duration: 300, timingFunction: "ease" }}
      styles={{
        content: {
          position: "absolute",
          bottom: "calc(env(safe-area-inset-bottom) + 16px)",
          maxHeight: "80vh",
          width: "90%",
        },
      }}
    >
      <Flex direction="column" rowGap={10} className="modal-parent-portal">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Tabs defaultValue={currentTab} onChange={(value: string | null) => setCurrentTab(value as MealType)}>
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
    </Modal>
  );
});

ModalInputForm.displayName = "ModalInputForm";

export default ModalInputForm;
