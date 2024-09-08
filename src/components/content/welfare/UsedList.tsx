"use client";
import { DateSubText } from "@/template/DateSubText";
import { Affix, Button, Card, Divider, Flex, Group, NumberFormatter, rem, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconChevronDown, IconCircle, IconCircleCheckFilled, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useLayoutEffect, useState } from "react";
import { ListWrapper } from "./ListWrapper";
dayjs.locale("ko");
const dummy = [
  {
    date: "12월 5일 목요일",
    amount: 120000,
    isApproved: true,
    payer: "사람",
    accompany: ["사람2"],
    place: "스타벅스",
  },
  {
    date: "12월 5일 목요일",
    amount: 100000,
    isApproved: false,
    payer: "사람1",
    accompany: null,
    place: "빽다방",
  },
  {
    date: "12월 5일 목요일",
    amount: 120000,
    isApproved: true,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
  {
    date: "9월 5일 목요일",
    amount: 120000,
    isApproved: true,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
  {
    date: "3월 5일 목요일",
    amount: 120000,
    isApproved: false,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
  {
    date: "3월 5일 목요일",
    amount: 120000,
    isApproved: false,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
  {
    date: "3월 5일 목요일",
    amount: 120000,
    isApproved: false,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
  {
    date: "3월 5일 목요일",
    amount: 120000,
    isApproved: false,
    payer: "사람",
    place: "와이브루",
    accompany: ["사람2", "사람1"],
  },
];

export const UsedList = () => {
  const [value, setValue] = useState<Date | null>(null);

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
            <Card py={0}>
              <Flex align={"center"} columnGap={"sm"}>
                {item.isApproved ? <IconCircleCheckFilled color="#005b9a" /> : <IconCircle color="#005b9a" />}

                <Stack gap={2.5}>
                  <DateSubText date={item.date} />
                  <NumberFormatter thousandSeparator value={item.amount} suffix=" 원" style={{ fontWeight: 700 }} />

                  <Group gap={"xs"}>
                    <Text size="sm" c={"gray.6"}>
                      {item.place}
                    </Text>
                    <Divider orientation="vertical" />
                    <Flex>
                      {item.accompany &&
                        item.accompany.map((name) => (
                          <Text size="sm" c={"gray.6"}>
                            {name}
                          </Text>
                        ))}
                    </Flex>
                  </Group>
                </Stack>
              </Flex>
              {index + 1 === arr.length ? null : <Divider my="sm" />}
            </Card>
          </React.Fragment>
        ))}
      </ListWrapper>
      <Affix position={{ bottom: 80, right: 20 }}>
        {/* <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => ( */}
        <Button
          //   size="xs"
          color="blue.9"
          leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}

          //   onClick={() => scrollTo({ y: 0 })}
        >
          내역추가
        </Button>
        {/* )}
        </Transition> */}
      </Affix>
    </Flex>
  );
};
