"use client";
import BottomModal from "@/components/Global/BottomModal";
import { welfareStore } from "@/lib/store/welfareStore";
import { DateSubText } from "@/template/DateSubText";
import { Affix, Button, Card, Divider, Flex, Group, Indicator, NumberFormatter, Pill, Popover, rem, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useState } from "react";
import Checked from "../../../../public/icons/circle-check.svg";
import { ListWrapper } from "./ListWrapper";
import WelfareInputForm from "./WelfareInputForm";
dayjs.locale("ko");

export const UsedList = ({ setCalendarYearMonth }: any) => {
  const { welfareInfo } = welfareStore((state) => state);

  // const [selectMonth, setSelectMonth] = useState<Date | null>(dayjs().toDate());

  const [selectMonth, setSelectMonth] = useState<[Date | null, Date | null]>([null, null]);
  console.log("🚀 ~ UsedList ~ selectMonth:", selectMonth);

  const [opened, { toggle, close }] = useDisclosure(false);

  const icon = <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  const changeMonth = (e: any) => {
    const year = dayjs(e).year();
    const month = dayjs(e).month() + 1;
    setCalendarYearMonth((prev: any) => ({ ...prev, year: year, month: month }));
    setSelectMonth(e);
  };

  return (
    <Flex direction={"column"} bg={"white"}>
      <Flex px={"md"} py={"xs"} justify={"space-between"} align={"center"}>
        <MonthPickerInput
          rightSection={icon}
          rightSectionPointerEvents="none"
          value={selectMonth}
          onChange={changeMonth}
          valueFormat="YYYY년 MMM"
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
          welfareInfo.welfares?.map((item, index, arr) => (
            <React.Fragment key={item.welfareIdx}>
              <DateSubText date={item.targetDay} />
              <Card py={0} mb={"md"}>
                <Flex align={"center"} columnGap={"sm"}>
                  {/* {item.isApproved ? <IconCircleCheckFilled color="#005b9a" /> : <IconCircle color="#005b9a" />} */}
                  <Checked width={25} height={20} color={"#1c7ed6"} />

                  <Stack gap={2.5}>
                    <NumberFormatter thousandSeparator value={item.amount || 0} suffix=" 원" className="text-md font-bold" />

                    <Group gap={"xs"}>
                      <Text size="sm" c={"gray.6"}>
                        {item.content}
                      </Text>
                      <Divider orientation="vertical" />
                      {item.payeeList.length === 0 ? (
                        <Pill size="sm" c={"blue.8"} bg={"#ecf5fe"} key={index}>
                          {item.selfWrittenYN === "Y" ? "직접결제" : `${item.payerName} 결제`}
                        </Pill>
                      ) : (
                        <Popover position="bottom-start" withArrow shadow="xl" arrowSize={10} radius={"lg"}>
                          <Popover.Target>
                            <Indicator
                              inline
                              label={
                                <Text fw={700} c={"blue.8"} size="xs">
                                  +{item.payeeList.length}
                                </Text>
                              }
                              size={20}
                              color="white"
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
                                  {item.selfWrittenYN === "Y" ? "직접결제" : `${item.payerName} 결제`}
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
                                {item.payeeList &&
                                  item.payeeList.map((list, index) => (
                                    <Pill size="sm" c={"gray.8"} key={index}>
                                      {list.userName}
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
              </Card>
            </React.Fragment>
          ))
        )}
      </ListWrapper>
      <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm />
      </BottomModal>
      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000}>
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Flex>
  );
};
