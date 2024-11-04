"use client";
import { useSubmitFormMeal } from "@/hooks/useSubmitForm";
import { calendarDateStore } from "@/lib/store/calendarDateStore";
import { updateQueries } from "@/utils/invalidQueries";

import { Button, Flex, Modal, NumberInput, Select, Tabs, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { forwardRef, useEffect, useRef, useState } from "react";
dayjs.locale("ko");
interface ModalInputForm2Props {
  opened: boolean;
  close: any;
}

type MealData = {
  payerName: string | null;
  place: string | null;
  amount: number | null | undefined;
  attendance?: string;
};

type FormValues = {
  targetDay: string;
  attendance: string;
  breakfast: MealData;
  lunch: MealData;
  dinner: MealData;
};

type MealType = "breakfast" | "lunch" | "dinner";

const ModalInputForm = forwardRef<HTMLDivElement, ModalInputForm2Props>(({ opened, close }, ref) => {
  const [openedModal, setOpenedModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [currentTab, setCurrentTab] = useState<MealType>("lunch");

  const innerRef = useRef<HTMLDivElement>(null); // 내부에서 사용할 ref 생성
  const { calendarDate } = calendarDateStore((state) => state);
  // const { currentDate } = currentDateStore((state) => state);

  const { mutate } = useSubmitFormMeal();

  const form = useForm<FormValues>({
    initialValues: {
      targetDay: dayjs(calendarDate.start).format("YYYY-MM-DD"),
      attendance: "근무",
      breakfast: {
        payerName: "",
        place: "",
        amount: null,
      },
      lunch: {
        payerName: "",
        place: "",
        amount: null,
      },
      dinner: {
        payerName: "",
        place: "",
        amount: null,
      },
    },
  });

  const handleSelectChange = (value: any) => {
    form.setFieldValue(`${currentTab}.payerName`, value);
    setOpenedModal(false);
    setSearchValue("");
    setIsActive(false); // 선택 시 active 상태 해제
  };

  // useEffect(() => {
  //   form.setFieldValue("targetDay", dayjs(currentDate).format("YYYY-MM-DD"));
  // }, [currentDate]);

  useEffect(() => {
    renderAttendance();
  }, [currentTab]);

  const renderAttendance = () => {
    if (currentTab === "lunch") {
      return (
        <Select
          label="근태"
          placeholder="근태 유형을 선택해 주세요."
          data={["근무", "오전 반차", "오후 반차", "휴가", "재택근무"]}
          searchable
          styles={{
            dropdown: {
              zIndex: 1001, // 드롭다운의 z-index를 수동으로 설정
            },
          }}
          key={form.key(`attendance`)}
          {...form.getInputProps(`attendance`)}
        />
      );
    } else {
      return null;
    }
  };

  // forwardedRef를 innerRef와 연결
  useEffect(() => {
    if (!ref) return;

    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  }, [ref]);

  const submit = (values: any) => {
    form.setFieldValue("targetDay", dayjs(calendarDate.start).format("YYYY-MM-DD"));
    mutate(values, {
      onSuccess: () => {
        notifications.show({
          title: "식대 입력",
          message: "식대 내역이 저장되었습니다.",
          position: "top-center",
          color: "green",
        });
        close();
        updateQueries(["meals"]);
      },
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        ref={ref}
        zIndex={100}
        radius="md"
        withCloseButton={false}
        title={
          <Flex align={"end"} columnGap={"sm"}>
            <Text fw={700} size="lg">
              식대 입력
            </Text>
            <Text c={"gray.7"} size="sm">
              {/* {dayjs(currentDate).format("MM월 DD일 dddd")} */}
            </Text>
          </Flex>
        }
        transitionProps={{ transition: "slide-up", duration: 300, timingFunction: "ease" }} // transitionProps로 전환 효과 설정
        styles={{
          content: {
            position: "absolute",
            bottom: "calc(env(safe-area-inset-bottom) + 16px)",
            maxHeight: "80vh",
            width: "90%",
            // zIndex: 1000,
          },
        }}
      >
        <Flex direction={"column"} rowGap={10} className="modal-parent-portal">
          <form onSubmit={form.onSubmit(submit)}>
            <Tabs defaultValue={currentTab} onChange={(e: any) => setCurrentTab(e)}>
              <Tabs.List grow>
                <Tabs.Tab value="breakfast">조식</Tabs.Tab>
                <Tabs.Tab value="lunch">중식</Tabs.Tab>
                <Tabs.Tab value="dinner">석식</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value={currentTab}>
                <Flex direction={"column"} rowGap={10} py={"md"}>
                  {renderAttendance()}
                  <Select
                    label="결제자"
                    placeholder="결제자를 선택해 주세요."
                    data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
                    searchable
                    value={form.values[currentTab].payerName}
                    onChange={(value: any) => handleSelectChange(value)}
                    searchValue={searchValue}
                    onSearchChange={(newValue: any) => {
                      setSearchValue(newValue);
                      if (isActive) {
                        setOpenedModal(true);
                      }
                    }}
                    comboboxProps={{
                      position: "bottom",
                      middlewares: { flip: true, shift: true },
                      portalProps: {
                        target: innerRef?.current ?? undefined,
                      },
                    }}
                    styles={{
                      dropdown: {
                        position: "absolute",
                        zIndex: 1000,
                      },
                      input: {
                        cursor: "pointer",
                      },
                    }}
                    dropdownOpened={openedModal && isActive} // active 상태일 때만 드롭다운 표시
                    onDropdownClose={() => {
                      setOpenedModal(false);
                      setSearchValue("");
                    }}
                    onClick={() => {
                      setIsActive(true); // 클릭 시 active 상태로 변경
                      setOpenedModal(true); // 클릭 시 드롭다운 열기
                    }}
                    onBlur={() => {
                      if (!form.values[currentTab].payerName) {
                        setIsActive(false); // 값이 없을 때 포커스를 잃으면 active 상태 해제
                      }
                    }}
                    error={form.errors["currentTab.payerName"]}
                  />
                  <TextInput
                    key={form.key(`${currentTab}.place`)}
                    {...form.getInputProps(`${currentTab}.place`)}
                    label="식당명"
                    placeholder="식당 상호명을 입력해 주세요."
                  />

                  <NumberInput
                    key={form.key(`${currentTab}.amount`)}
                    {...form.getInputProps(`${currentTab}.amount`)}
                    label="금액"
                    placeholder="금액을 입력해 주세요."
                    thousandSeparator=","
                    hideControls
                    suffix=" 원"
                  />
                  {/* <TextInput
                    type="number"
                    key={form.key(`${currentTab}.amount`)}
                    {...form.getInputProps(`${currentTab}.amount`)}
                    label="금액"
                    placeholder="금액을 입력해 주세요."
                  /> */}
                </Flex>
              </Tabs.Panel>
              <Button fullWidth type="submit">
                저장하기
              </Button>
            </Tabs>
          </form>
        </Flex>
      </Modal>
    </>
  );
});

ModalInputForm.displayName = "ModalInputForm";

export default ModalInputForm;
