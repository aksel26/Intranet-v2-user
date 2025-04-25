"use client";
import { ActionIcon, Affix, Button, Checkbox, Flex, Group, NumberFormatter, Paper, rem, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ArrowRight from "/public/icons/arrow-right.svg";

import BottomModal from "@/components/Global/BottomModal";
import EmptyView from "@/components/Global/view/EmptyView";
import { ErrorView } from "@/components/Global/view/ErrorView";
import LoadingView from "@/components/Global/view/LoadingView";
import { myInfoStore } from "@/lib/store/myInfoStore";
import { TActivityDetail } from "@/lib/types/activity";
import ActivityInputForm from "./ActivityInputForm";
import ActivityUpdateForm from "./ActivityUpdateForm";

export const UsedListActivity = ({ activities, isLoading, isError }: any) => {
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

  const ListWrapper = () => {
    return (
      <>
        {activities?.map((record: any, index: number, arr: any) => {
          return (
            <React.Fragment key={index}>
              <Items key={record.commuteIdx} item={record} index={index} arr={arr} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const Items = ({ item }: any) => (
    <Stack gap={10} my={"lg"}>
      <Text c={"dimmed"} size="xs">
        {dayjs(item.date).format("MM월 D일 dddd")}
      </Text>
      {item.list.map((t: any) => (
        <Paper key={t.activityIdx}>
          <Group justify="space-between" w="100%" h={"100%"}>
            <Flex align={"center"} columnGap={"sm"}>
              <Checkbox size="xs" checked={t.confirmYN === "Y" ? true : false} radius="sm" readOnly />
              <Stack gap={3}>
                <Text fw={600} ta={"left"} fz={"sm"}>
                  <NumberFormatter thousandSeparator value={t.amount || 0} suffix=" 원" className="text-md font-bold" />
                </Text>

                <Text fz={"xs"} c={"dimmed"}>
                  {t.content}
                </Text>
              </Stack>
            </Flex>
            <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateActivity(e, item, t.activityIdx)}>
              <ArrowRight color="gray" width={18} />
            </ActionIcon>
          </Group>
        </Paper>
      ))}
    </Stack>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>활동비 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (activities?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Text mb={4} c={"dimmed"} fz={"sm"}>
        사용내역
      </Text>
      {renderContent()}

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
