"use client";
import FetchWrapper from "@/components/fetchWrapper";
import BottomModal from "@/components/Global/BottomModal";
import { DateSubText } from "@/template/DateSubText";
import { ActionIcon, Affix, Button, Checkbox, Flex, Group, NumberFormatter, Paper, rem, Stack, Text, Title } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useState } from "react";
import { ListWrapper } from "./ListWrapper";
import WelfareInputForm from "./WelfareInputForm";
import WelfareUpdateForm from "./WelfareUpdateForm";
import ArrowRight from "/public/icons/arrow-right.svg";
import { TWelfare } from "@/lib/types/welfare";
dayjs.locale("ko");

export const UsedListWelfare = ({ welfares, isLoading }: any) => {
  console.log("🚀 ~ UsedListWelfare ~ welfares:", welfares);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedUpdateForm, { toggle: toggleUpdateForm, close: closeUpdateForm }] = useDisclosure(false);

  const [updateWelfareDetail, setUpdateWelfaretDetail] = useState<any>();

  const handleUpdateWelfare = (e: any, detail: any, idx: number) => {
    const target = detail.list.filter((item: TWelfare) => item.welfareIdx === idx)[0];
    setUpdateWelfaretDetail(target);

    toggleUpdateForm();
  };
  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Title order={5} mb={"md"}>
        사용내역 조회
      </Title>
      <FetchWrapper data={welfares} isLoading={isLoading}>
        <ListWrapper>
          {welfares?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <DateSubText date={item.date} />
              {item.list.map((t: any) => (
                <Paper key={t.welfareIdx}>
                  <Group justify="space-between" w="100%" h={"100%"}>
                    <Flex align={"center"} columnGap={"sm"}>
                      <Checkbox size="xs" checked={t.confirmYN === "Y" ? true : false} onChange={() => {}} defaultChecked radius="xl" />
                      <Stack gap={3}>
                        <Text fw={600} ta={"left"} fz={"sm"}>
                          <NumberFormatter thousandSeparator value={t.amount || 0} suffix=" 원" className="text-md font-bold" />
                        </Text>

                        <Group gap={"xs"}>
                          <Text fz={"xs"} c={"dimmed"}>
                            {t.content}
                          </Text>
                        </Group>
                      </Stack>
                    </Flex>
                    <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateWelfare(e, item, t.welfareIdx)}>
                      <ArrowRight color="gray" width={18} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </React.Fragment>
          ))}
        </ListWrapper>
      </FetchWrapper>
      <BottomModal opened={openedUpdateForm} onClose={closeUpdateForm} title={"복지포인트 수정"}>
        <WelfareUpdateForm onClose={closeUpdateForm} updateWelfareDetail={updateWelfareDetail} />
      </BottomModal>
      <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm onClose={close} opened={opened} />
      </BottomModal>

      <Affix position={{ bottom: 80, right: 20 }} zIndex={1000} hiddenFrom="md">
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Paper>
  );
};
