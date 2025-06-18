"use client";
import BottomModal from "@/components/Global/BottomModal";
import EmptyView from "@/components/Global/view/EmptyView";
import LoadingView from "@/components/Global/view/LoadingView";
import { TPayeeList, TWelfare } from "@/lib/types/welfare";
import { ActionIcon, Affix, Badge, Button, Checkbox, Divider, Flex, Group, NumberFormatter, Paper, rem, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import dayjs from "dayjs";
import React, { useState } from "react";
import WelfareInputForm from "./WelfareInputForm";
import WelfareUpdateForm from "./WelfareUpdateForm";
import ArrowRight from "/public/icons/arrow-right.svg";
import { ErrorView } from "@/components/Global/view/ErrorView";

export const UsedListWelfare = ({ welfares, isLoading, isError }: any) => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [openedUpdateForm, { toggle: toggleUpdateForm, close: closeUpdateForm }] = useDisclosure(false);

  const [updateWelfareDetail, setUpdateWelfaretDetail] = useState<any>();

  const handleUpdateWelfare = (e: any, detail: any, idx: number) => {
    const target = detail.list.filter((item: TWelfare) => item.welfareIdx === idx)[0];
    setUpdateWelfaretDetail(target);

    toggleUpdateForm();
  };

  const ListWrapper = () => {
    return (
      <>
        {welfares?.map((record: any, index: number, arr: any) => {
          return (
            <React.Fragment key={index}>
              <Items key={record.commuteIdx} item={record} index={index} arr={arr} />
            </React.Fragment>
          );
        })}
      </>
    );
  };

  const Items = ({ item, key }: any) => (
    <Stack gap={8} my={"xl"}>
      <Text c={"dimmed"} size="xs">
        {dayjs(item.date).format("MM월 D일 dddd")}
      </Text>
      <Stack>
        {item.list.map((t: any) => (
          <Paper key={t.welfareIdx}>
            <Group justify="space-between" w="100%" h={"100%"}>
              <Flex align={"center"} columnGap={"sm"}>
                <Badge radius={"sm"} size="sm" variant="light" color={t.confirmYN === "Y" ? "blue" : "yellow"} miw={48}>
                  {t.confirmYN === "Y" ? "확정" : "미확정"}
                </Badge>
                {/* <Checkbox size="xs" checked={t.confirmYN === "Y" ? true : false} radius="sm" readOnly /> */}
                <Stack gap={3}>
                  <Group gap={"xs"}>
                    <Text fw={500} ta={"left"} fz={"sm"}>
                      <NumberFormatter thousandSeparator value={t.amount || 0} suffix=" 원" />
                    </Text>
                    <Divider orientation="vertical" />
                    <Text fz={"xs"} c={"dimmed"}>
                      {t.content}
                    </Text>
                  </Group>

                  <Group>
                    {t.payeeList.map((p: TPayeeList) => (
                      <Text key={p.userIdx} fz={"xs"} c={"dimmed"}>
                        {p.userName}
                      </Text>
                    ))}
                  </Group>
                </Stack>
              </Flex>
              <ActionIcon variant="subtle" size="xl" onClick={(e) => handleUpdateWelfare(e, item, t.welfareIdx)}>
                <ArrowRight color="gray" width={18} />
              </ActionIcon>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );

  const renderContent = () => {
    if (isLoading) return <LoadingView />;
    if (isError) return <ErrorView>복지포인트 내역을 불러오는 중 문제가 발생했습니다.</ErrorView>;
    if (welfares?.length === 0) return <EmptyView />;
    return <ListWrapper />;
  };

  return (
    <Paper bg={"white"} px="lg" py="lg" radius={"lg"}>
      <Stack gap={3}>
        <Text c={"gray.7"} fz={"sm"}>
          사용내역
        </Text>
        <Text fz={"xs"} c={"gray"}>
          확정 / 미확정은 P&C 담당자의 사용내역 확인 결과를 나타냅니다.
        </Text>
      </Stack>
      {renderContent()}
      <BottomModal opened={openedUpdateForm} onClose={closeUpdateForm} title={"복지포인트 수정"}>
        <WelfareUpdateForm opened={openedUpdateForm} onClose={closeUpdateForm} updateWelfareDetail={updateWelfareDetail} />
      </BottomModal>
      <BottomModal opened={opened} onClose={close} title={"복지포인트 입력"}>
        <WelfareInputForm onClose={close} opened={opened} />
      </BottomModal>

      <Affix zIndex={199} position={{ bottom: 80, right: 20 }} hiddenFrom="md">
        <Button radius={"lg"} onClick={toggle} color="blue.9" leftSection={<IconPlus style={{ width: rem(16), height: rem(16) }} />}>
          내역추가
        </Button>
      </Affix>
    </Paper>
  );
};
