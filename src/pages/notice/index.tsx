import CreateNotice from "@/components/notice/create";
import NoticeList from "@/components/notice/list";
import SearchNotice from "@/components/notice/search";
import { Affix, Button, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import React, { useState } from "react";

const Notice = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [params, setParams] = useState({
    perPage: 20,
    pageNo: 1,
  });

  return (
    <>
      <Stack gap={1} mb="xs">
        <Title order={4}> 공지/일정</Title>
        <Text c={"gray.6"} fz={"sm"}>
          검사 외의 공지는 P&C팀에게 문의해 주시기 바랍니다.
        </Text>
      </Stack>
      <Paper bg={"white"} px="md" py="lg" radius={"lg"} mt={"xs"}>
        <Group justify="space-between" align="center">
          <SearchNotice setParams={setParams} />
          <Button visibleFrom="md" size="xs" leftSection={<Plus size={15} />} onClick={open}>
            일정등록
          </Button>
        </Group>

        {/* <Suspense fallback={<Loading />}> */}
        <NoticeList params={params} />
        {/* </Suspense> */}
      </Paper>
      <Affix position={{ bottom: 20, right: 20 }} hiddenFrom="md">
        <Button leftSection={<Plus size={15} />} onClick={open} size="sm">
          등록
        </Button>
      </Affix>
      <CreateNotice opened={opened} close={close} />
    </>
  );
};

export default Notice;
