"use client";
import { DateSubText } from "@/template/DateSubText";
import { Affix, Button, Card, Divider, Flex, Group, Indicator, NumberFormatter, Pill, rem, Stack, Text } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { IconChevronDown, IconCircle, IconCircleCheckFilled, IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useLayoutEffect, useState } from "react";
// import { ListWrapper } from "./ListWrapper";
import { useDisclosure } from "@mantine/hooks";
import BottomModal from "@/components/Global/BottomModal";
// import WelfareInputForm from "./WelfareInputForm";
import { useGetUsers } from "@/hooks/useGetUsers";
import { welfareStore } from "@/lib/store/welfareStore";
import { ListWrapper } from "../welfare/ListWrapper";
dayjs.locale("ko");

export const UsedListActivity = ({ setCalendarYearMonth }: any) => {
  const { welfareInfo } = welfareStore((state) => state);
  const [selectMonth, setSelectMonth] = useState<Date | null>(dayjs().toDate());
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
        />
      </Flex>
      <ListWrapper>
        {
          welfareInfo.welfares.length < 1 ? (
            <Text ta={"center"} mt={40} c={"gray.7"}>
              {selectMonth && selectMonth?.getMonth() + 1}월에는 활동비 사용 내역이 없어요.
            </Text>
          ) : null
          // welfareInfo.welfares?.map((item, index, arr) => (
          //   <React.Fragment key={index}>
          //     <Card py={0} mb={"md"}>
          //       <Flex align={"center"} columnGap={"sm"}>
          //         {item.isApproved ? <IconCircleCheckFilled color="#005b9a" /> : <IconCircle color="#005b9a" />}

          //         <Stack gap={2.5}>
          //           <DateSubText date={item.targetDay} />
          //           <NumberFormatter thousandSeparator value={item.amount || 0} suffix=" 원" style={{ fontWeight: 700 }} />

          //           <Group gap={"xs"}>
          //             <Text size="sm" c={"gray.6"}>
          //               {item.content}
          //             </Text>
          //             <Divider orientation="vertical" />

          //             <Pill size="sm" c={"blue.8"} bg={"blue.1"} key={index}>
          //               {item.selfWrittenYN === "Y" ? "직접결제" : "OOO 위원 결제"}
          //             </Pill>

          //             {/* <Divider orientation="vertical" /> */}

          //             <Group gap={5}>
          //               {item.payeeList &&
          //                 item.payeeList.map((list, index) => (
          //                   <Pill size="sm" c={"gray.6"} key={index}>
          //                     {list.userName}
          //                   </Pill>
          //                 ))}
          //             </Group>
          //           </Group>
          //         </Stack>
          //       </Flex>
          //     </Card>
          //   </React.Fragment>
          // ))
        }
      </ListWrapper>
      {/* <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm />
      </BottomModal> */}
      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000}>
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Flex>
  );
};
