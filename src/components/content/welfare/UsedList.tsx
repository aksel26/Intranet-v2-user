"use client";
import BottomModal from "@/components/Global/BottomModal";
import { useDeleteWelfares } from "@/hooks/useSubmitForm";
import { toggleStore } from "@/lib/store/toggleStore";
import { welfareStore } from "@/lib/store/welfareStore";
import { DateSubText } from "@/template/DateSubText";
import { compareMonth } from "@/utils/monthDate";
import { groupByDate } from "@/utils/welfare/groupByDate";
import { ActionIcon, Affix, Button, Card, Divider, Flex, Group, Indicator, NumberFormatter, Pill, Popover, rem, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useEffect, useState } from "react";
import ArrowRight from "../../../../public/icons/arrow-right.svg";
import Checked from "../../../../public/icons/circle-check.svg";
import { ListWrapper } from "./ListWrapper";
import WelfareInputForm from "./WelfareInputForm";
import WelfareUpdateForm from "./WelfareUpdateForm";
dayjs.locale("ko");

export const UsedList = ({ setCalendarYearMonth }: any) => {
  const { welfareInfo } = welfareStore((state) => state);

  const [dateGroup, setDateGroup] = useState<any>([]);

  useEffect(() => {
    setDateGroup(groupByDate(welfareInfo.welfares));
  }, [welfareInfo]);

  const [selectMonth, setSelectMonth] = useState<[Date | null, Date | null]>([new Date(), new Date()]);

  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedUpdateForm, { toggle: toggleUpdateForm, close: closeUpdateForm }] = useDisclosure(false);

  const icon = <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  const [monthDisplay, setMonthDisplay] = useState([]);

  const changeMonth = (e: any) => {
    const [sDate, eDate] = e;
    const year = dayjs(sDate).year();
    const monthRange = compareMonth(e);

    setCalendarYearMonth((prev: any) => ({ ...prev, year: year, month: monthRange }));
    setSelectMonth(e);
  };

  const [updateWelfareDetail, setUpdateWelfareDetail] = useState<any>();

  const handleUpdateWelfare = (e: any, detail: any) => {
    toggleUpdateForm();
    openModal();
    setUpdateWelfareDetail(detail);
  };

  const { setToggleInfo } = toggleStore();

  const openModal = () => {
    setToggleInfo(true); // 열기
  };
  const handleClose = () => {
    console.log("????");
    setToggleInfo(false); // 열기
    closeUpdateForm();
  };

  return (
    <Flex direction={"column"} bg={"white"}>
      <Flex px={"md"} pt={"xs"} justify={"space-between"} align={"center"}>
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
      </Flex>
      <ListWrapper>
        {welfareInfo.welfares.length < 1 ? (
          <Text ta={"center"} mt={40} c={"gray.7"}>
            {/* {selectMonth && selectMonth?.getMonth() + 1}월에는 복지포인트 사용 내역이 없어요. */}
          </Text>
        ) : (
          dateGroup?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <DateSubText date={item.date} />

              {item.list.map((listContent: any, index: number) => (
                <Card py={0} mb={"lg"} key={index}>
                  <Group justify="space-between">
                    <Flex align={"center"} columnGap={"sm"}>
                      <Checked width={25} height={20} color={"#1c7ed6"} />
                      <Stack gap={1}>
                        <NumberFormatter thousandSeparator value={listContent.amount || 0} suffix=" 원" className="text-md font-bold" />

                        <Group gap={"xs"}>
                          <Text size="sm" c={"gray.6"}>
                            {listContent.content}
                          </Text>
                          <Divider orientation="vertical" />
                          {listContent.payeeList.length === 0 ? (
                            <Pill size="sm" c={"blue.8"} bg={"#ecf5fe"} key={index}>
                              {listContent.selfWrittenYN === "Y" ? "직접결제" : `${listContent.payerName} 결제`}
                            </Pill>
                          ) : (
                            <Popover position="bottom-start" withArrow shadow="xl" arrowSize={10} radius={"lg"}>
                              <Popover.Target>
                                <Indicator
                                  inline
                                  label={
                                    <Text fw={800} c={"blue.8"} size="xs">
                                      +{listContent.payeeList.length}
                                    </Text>
                                  }
                                  size={10}
                                  color="white"
                                  zIndex={100}
                                >
                                  <Button
                                    size="xs"
                                    variant="light"
                                    radius={"xl"}
                                    key={index}
                                    py={4}
                                    px={10}
                                    classNames={{
                                      root: "h-[var(--pill-sm-height)] ",
                                      label: "leading-[var(--pill-sm-height)] h-[var(--pill-sm-height)] flex items-center",
                                    }}
                                  >
                                    <Text
                                      classNames={{
                                        root: "leading-[var(--pill-height)]",
                                      }}
                                      c={"blue.8"}
                                      size={"xs"}
                                    >
                                      {listContent.selfWrittenYN === "Y" ? "직접결제" : `${listContent.payerName} 결제`}
                                    </Text>
                                  </Button>
                                </Indicator>
                              </Popover.Target>
                              <Popover.Dropdown>
                                <Stack gap={"sm"}>
                                  <Text c={"gray.8"} size="sm" fw={600}>
                                    같이 결제한 인원
                                  </Text>
                                  <Group gap={5}>
                                    {listContent.payeeList &&
                                      listContent.payeeList.map((payee: any, index: number) => (
                                        <Pill size="sm" c={"gray.8"} key={index}>
                                          {payee.userName}
                                        </Pill>
                                      ))}
                                  </Group>
                                </Stack>
                              </Popover.Dropdown>
                            </Popover>
                          )}
                        </Group>
                      </Stack>
                    </Flex>
                    <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateWelfare(e, listContent)}>
                      <ArrowRight color="gray" width={18} />
                    </ActionIcon>
                  </Group>
                </Card>
              ))}
            </React.Fragment>
          ))
        )}
      </ListWrapper>
      <BottomModal opened={openedUpdateForm} onClose={handleClose} title={"복지포인트 수정"}>
        <WelfareUpdateForm onClose={handleClose} updateWelfareDetail={updateWelfareDetail} />
      </BottomModal>
      <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm onClose={close} />
      </BottomModal>

      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000}>
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Flex>
  );
};
