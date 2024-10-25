"use client";

import { Button, Flex, Modal, Select, Text } from "@mantine/core";
import { ContentWrapper } from "../Global/ContentWrapper";

import { currentDateStore } from "@/lib/store/dateStore";
import { mealStore } from "@/lib/store/mealStore";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowBack } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useEffect, useRef, useState } from "react";
import BottomModal from "../Global/BottomModal";
import { DetailCard } from "../content/meal/DetailCard";
import MealInputForm from "../content/meal/MealInputForm";
import { useForm } from "@mantine/form";
dayjs.locale("ko");

export const Detail = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { meals } = mealStore((state) => state.mealInfo);

  const { currentDate } = currentDateStore((state) => state);

  const [targetList, setTargetList] = useState<any>();

  useEffect(() => {
    // const date = dayjs(currentDate).format("MM월 DD일 dddd");
    // setCurrentDate(date);

    setTargetList(
      meals.filter((item: any) => {
        if (item.start === dayjs(currentDate).format("YYYY-MM-DD")) {
          return item;
        }
      })
    );
  }, [currentDate]);

  // console.log(targetList);

  const [dropDwonOpened, setDropDownOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const form = useForm({
    initialValues: {
      "breakfast-payerName": "",
    },
    validate: {
      "breakfast-payerName": (value) => (value ? null : "결제자를 선택해주세요"),
    },
  });

  return (
    <Flex direction="column" bg={"white"} px="md" py="lg" rowGap={"sm"}>
      <Modal opened={opened} onClose={close} size="xl" ref={modalRef}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Select
            label="결제자"
            placeholder="결제자를 선택해 주세요."
            data={["김정현", "이혜빈", "윤용설", "신효은", "이승현", "김현민"]}
            searchable
            searchValue={searchValue}
            onSearchChange={(newValue) => {
              setSearchValue(newValue);
              setDropDownOpened(true);
            }}
            comboboxProps={{
              position: "bottom",
              middlewares: { flip: true, shift: true },
              portalProps: {
                target: modalRef.current ?? undefined,
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
            // onChange={}
            dropdownOpened={dropDwonOpened}
            onDropdownClose={() => {
              setDropDownOpened(false);
              setSearchValue("");
            }}
            onClick={() => setDropDownOpened(true)}
            error={form.errors["breakfast-payerName"]}
            {...form.getInputProps("breakfast-payerName")}
          />
          <button type="submit">Submit</button>
        </form>
      </Modal>
      {/* <BottomModal opened={opened} onClose={close} title={"식대입력"}>
        <MealInputForm />
      </BottomModal> */}
      <Flex justify="space-between" align={"center"}>
        <Text size="md" c={"gray.6"}>
          {dayjs(currentDate).date()}
        </Text>
        <Button size="xs" leftSection={<IconArrowBack size={14} />} variant="default">
          초기화
        </Button>
      </Flex>
      {/* <ClickablePaper onClick={toggle}>
        <Flex justify="space-between" align={"center"}>
          <Text size="sm">입력하지 않으셨네요!</Text>
          <IconChevronRight color="gray" size={18} />
        </Flex>
      </ClickablePaper> */}

      <DetailCard toggle={toggle} />
    </Flex>
  );
};
