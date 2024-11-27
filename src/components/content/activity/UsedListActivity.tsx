"use client";
import { ActionIcon, Affix, Button, Card, Divider, Flex, Group, NumberFormatter, Paper, Pill, rem, Stack, Text, Title } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useEffect, useState } from "react";
import ArrowRight from "../../../../public/icons/arrow-right.svg";
import { useDisclosure } from "@mantine/hooks";
import Checked from "../../../../public/icons/circle-check.svg";
import { activityStore } from "@/lib/store/activityStore";
// import { ListWrapper } from "../welfarePoint/ListWrapper";
import { compareMonth } from "@/utils/monthDate";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { DateSubText } from "@/template/DateSubText";
import BottomModal from "@/components/Global/BottomModal";
import ActivityInputForm from "./ActivityInputForm";
import ActivityUpdateForm from "./ActivityUpdateForm";
import { ListWrapper } from "../welfare/ListWrapper";
import { myInfoStore } from "@/lib/store/myInfoStore";
dayjs.locale("ko");

export const UsedListActivity = ({ setCalendarYearMonth }: any) => {
  const { activityInfo } = activityStore((state) => state);
  const [selectMonth, setSelectMonth] = useState<[Date | null, Date | null]>([new Date(), new Date()]);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedUpdateForm, { toggle: toggleUpdateForm, close: closeUpdateForm }] = useDisclosure(false);

  const icon = <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  const [dateGroup, setDateGroup] = useState<any>([]);

  const [updateActivityDetail, setUpdateAcitivytDetail] = useState<any>();

  const changeMonth = (e: any) => {
    const [sDate, eDate] = e;
    console.log("🚀 ~ changeMonth ~ e:", e);
    const year = dayjs(sDate).year();
    const monthRange = compareMonth(e);

    setCalendarYearMonth((prev: any) => ({ ...prev, year: year, month: monthRange }));
    setSelectMonth(e);
  };

  const handleUpdateActivity = (e: any, detail: any) => {
    toggleUpdateForm();
    // openModal();
    setUpdateAcitivytDetail(detail);
  };

  useEffect(() => {
    setDateGroup(groupByDate(activityInfo.activities));
  }, [activityInfo]);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const { myInfo } = myInfoStore();

  useEffect(() => {
    if (myInfo.gradeName === "인턴" || myInfo.gradeName === "위원" || myInfo.gradeName === "선임" || myInfo.gradeName === "책임") {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Title order={5} mb={"md"}>
        사용내역 조회
      </Title>

      <MonthPickerInput
        rightSection={icon}
        rightSectionPointerEvents="none"
        value={selectMonth}
        onChange={changeMonth}
        valueFormat="YYYY년 MM월"
        locale="ko-KR"
        style={{ fontWeight: 700, width: "max-content" }}
        variant="unstyled"
        allowSingleDateInRange
        type="range"
      />

      <ListWrapper>
        {activityInfo.activities.length < 1 ? (
          <Text ta={"center"} mt={40} c={"dimmed"} fz={"sm"}>
            해당 월에는 복지포인트 사용 내역이 없어요.
          </Text>
        ) : (
          dateGroup?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <DateSubText date={item.date} />

              {item.list.map((listContent: any, index: number) => (
                <Paper key={index}>
                  <Group justify="space-between" w="100%" h={"100%"}>
                    <Flex align={"center"} columnGap={"sm"}>
                      <Checked width={25} height={20} color={"#1c7ed6"} />
                      <Stack gap={3}>
                        <Text fw={700} ta={"left"} fz={"sm"}>
                          <NumberFormatter thousandSeparator value={listContent.amount || 0} suffix=" 원" className="text-md font-bold" />
                        </Text>

                        <Group gap={"xs"}>
                          <Text fz={"xs"} c={"dimmed"}>
                            {listContent.content}
                          </Text>
                        </Group>
                      </Stack>
                    </Flex>
                    <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateActivity(e, listContent)}>
                      <ArrowRight color="gray" width={18} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </React.Fragment>
          ))
        )}
      </ListWrapper>
      <BottomModal opened={opened} onClose={close} title={"활동비 입력"}>
        <ActivityInputForm onClose={close} opened={opened} />
      </BottomModal>

      <BottomModal opened={openedUpdateForm} onClose={closeUpdateForm} title={"활동비 수정"}>
        <ActivityUpdateForm onClose={closeUpdateForm} updateActivityDetail={updateActivityDetail} />
      </BottomModal>
      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000} hidden={!isAuthorized} hiddenFrom="md">
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Paper>
  );
};
