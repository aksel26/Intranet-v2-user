"use client";
import { DateSubText } from "@/template/DateSubText";
import { Affix, Button, Card, Divider, Flex, Group, Indicator, NumberFormatter, Pill, rem, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconChevronDown, IconCircle, IconCircleCheckFilled, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useLayoutEffect, useState } from "react";
import { ListWrapper } from "./ListWrapper";
import { useDisclosure } from "@mantine/hooks";
import BottomModal from "@/components/Global/BottomModal";
import WelfareInputForm from "./WelfareInputForm";
import { useGetUsers } from "@/hooks/useGetUsers";
dayjs.locale("ko");
const dummy = [
  {
    welfareIdx: 42,
    userIdx: 2,
    targetDay: "2024-11-05",
    content: "스타벅스 용산점",
    amount: 5500,
    payerName: "김현민",
    selfWrittenYN: "Y",
    payeeList: [],
    isApproved: true, // 참고
  },
  {
    welfareIdx: 39,
    userIdx: 2,
    targetDay: "2024-11-04",
    content: "메가커피",
    amount: null,
    payerName: "이승현",
    selfWrittenYN: "N",
    payeeList: [
      {
        userIdx: 2,
        userName: "김현민",
      },
      {
        userIdx: 3,
        userName: "윤용설",
      },
    ],

    isApproved: false, // 참고
  },
  // {
  //   date: "12월 5일 목요일",
  //   amount: 120000,
  //   isApproved: true,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
  // {
  //   date: "9월 5일 목요일",
  //   amount: 120000,
  //   isApproved: true,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
  // {
  //   date: "3월 5일 목요일",
  //   amount: 120000,
  //   isApproved: false,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
  // {
  //   date: "3월 5일 목요일",
  //   amount: 120000,
  //   isApproved: false,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
  // {
  //   date: "3월 5일 목요일",
  //   amount: 120000,
  //   isApproved: false,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
  // {
  //   date: "3월 5일 목요일",
  //   amount: 120000,
  //   isApproved: false,
  //   payer: "사람",
  //   place: "와이브루",
  //   accompany: ["사람2", "사람1"],
  // },
];

export const UsedList = ({ welfares }: any) => {
  const [value, setValue] = useState<Date | null>(null);
  const [opened, { toggle, close }] = useDisclosure(false);
  useLayoutEffect(() => {
    setValue(dayjs().toDate());
  }, []);
  const icon = <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />;

  return (
    <Flex direction={"column"} bg={"white"}>
      <Flex px={"md"} py={"xs"} justify={"space-between"} align={"center"}>
        <MonthPickerInput
          rightSection={icon}
          rightSectionPointerEvents="none"
          value={value}
          onChange={setValue}
          valueFormat="YYYY년 MMM"
          locale="ko-KR"
          style={{ fontWeight: 700, width: "max-content" }}
          variant="unstyled"
        />
      </Flex>
      <ListWrapper>
        {dummy.map((item, index, arr) => (
          <React.Fragment key={index}>
            <Card py={0} mb={"md"}>
              <Flex align={"center"} columnGap={"sm"}>
                {item.isApproved ? <IconCircleCheckFilled color="#005b9a" /> : <IconCircle color="#005b9a" />}

                <Stack gap={2.5}>
                  <DateSubText date={item.targetDay} />
                  <NumberFormatter thousandSeparator value={item.amount || 0} suffix=" 원" style={{ fontWeight: 700 }} />

                  <Group gap={"xs"}>
                    <Text size="sm" c={"gray.6"}>
                      {item.content}
                    </Text>
                    <Divider orientation="vertical" />

                    <Pill size="sm" c={"blue.8"} bg={"blue.1"} key={index}>
                      {item.selfWrittenYN === "Y" ? "직접결제" : "OOO 위원 결제"}
                    </Pill>

                    {/* <Divider orientation="vertical" /> */}

                    <Group gap={5}>
                      {item.payeeList &&
                        item.payeeList.map((list, index) => (
                          <Pill size="sm" c={"gray.6"} key={index}>
                            {list.userName}
                          </Pill>
                        ))}
                    </Group>
                  </Group>
                </Stack>
              </Flex>
              {/* {index + 1 === arr.length ? null : <Divider my="sm" />} */}
            </Card>
            {index === 2 && <Divider my="md" mt={0} label="10월" labelPosition="center" px={"md"} />}
          </React.Fragment>
        ))}
      </ListWrapper>
      <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm />
      </BottomModal>
      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000}>
        <Button onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Flex>
  );
};
