"use client";
import { ActionIcon, Affix, Button, Checkbox, Flex, Group, NumberFormatter, Paper, rem, Stack, Text, Title } from "@mantine/core";
import "@mantine/dates/styles.css";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
import React, { useEffect, useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";

import FetchWrapper from "@/components/fetchWrapper";
import BottomModal from "@/components/Global/BottomModal";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { DateSubText } from "@/template/DateSubText";
import { ListWrapper } from "../welfare/ListWrapper";
import ActivityInputForm from "./ActivityInputForm";
import ActivityUpdateForm from "./ActivityUpdateForm";
import { TActivityDetail } from "@/lib/types/activity";
dayjs.locale("ko");

export const UsedListActivity = ({ activities, isLoading }: any) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedUpdateForm, { toggle: toggleUpdateForm, close: closeUpdateForm }] = useDisclosure(false);

  const [updateActivityDetail, setUpdateAcitivytDetail] = useState<any>();

  const handleUpdateActivity = (e: any, detail: any, idx: number) => {
    const target = detail.list.filter((item: TActivityDetail) => item.activityIdx === idx)[0];
    toggleUpdateForm();
    // openModal();
    setUpdateAcitivytDetail(target);
  };

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
        사용내역
      </Title>

      <FetchWrapper data={activities} isLoading={isLoading}>
        <ListWrapper>
          {activities?.map((item: any, index: number) => (
            <React.Fragment key={index}>
              <DateSubText date={item.date} />
              {item.list.map((t: any) => (
                <Paper key={t.activityIdx}>
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
                    <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateActivity(e, item, t.activityIdx)}>
                      <ArrowRight color="gray" width={18} />
                    </ActionIcon>
                  </Group>
                </Paper>
              ))}
            </React.Fragment>
          ))}
        </ListWrapper>
      </FetchWrapper>
      <BottomModal opened={opened} onClose={close} title={"활동비 입력"}>
        <ActivityInputForm onClose={close} opened={opened} />
      </BottomModal>

      <BottomModal opened={openedUpdateForm} onClose={closeUpdateForm} title={"활동비 수정"}>
        <ActivityUpdateForm opened={openedUpdateForm} onClose={closeUpdateForm} updateActivityDetail={updateActivityDetail} />
      </BottomModal>
      <Affix position={{ bottom: 80, right: 20 }} zIndex={199} hidden={!isAuthorized} hiddenFrom="md">
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Paper>
  );
};
