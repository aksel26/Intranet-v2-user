"use client";
import PageContainer from "@/components/Global/container";
import CreateNotice from "@/components/notice/create";
import NoticeList from "@/components/notice/list";
import SearchNotice from "@/components/notice/search/index2";
import { Affix, Button, Group, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { Suspense, useState } from "react";
import Loading from "./loading";

const Notice = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  return (
    <PageContainer>
      <Stack gap={1} mb="xs">
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            공지/일정
          </Text>
        </Group>
        <Text c={"gray.6"} fz={"sm"}>
          검사 외의 공지는 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Stack>

      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"xs"}>
        <Stack gap={"xs"}>
          <Group justify="space-between" align="center">
            <SearchNotice setParams={setParams} />
            <Button visibleFrom="md" leftSection={<IconPlus size={15} />} onClick={open}>
              등록
            </Button>
          </Group>

          <Suspense fallback={<Loading />}>
            <NoticeList params={params} />
          </Suspense>
        </Stack>
      </Paper>
      <Affix position={{ bottom: 20, right: 20 }} hiddenFrom="md">
        <Button leftSection={<IconPlus size={15} />} onClick={open}>
          등록
        </Button>
      </Affix>
      <CreateNotice opened={opened} close={close} />
    </PageContainer>
  );
};

export default Notice;
