import ApprovalList from "@/components/approval/list";
import SearchApprovals from "@/components/approval/search";
import ScrollToTop from "@/components/common/scrollTop";
import type { TApproval } from "@/types/apiTypes/apiTypes";
import { Paper, Stack, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { useState } from "react";

const Approval = () => {
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
  });

  return (
    <>
      <Stack gap={1} mb="xs">
        <Title order={4}> 결재 및 승인</Title>
        <Text c={"gray.6"} fz={"sm"}>
          결재 및 승인 요청 내역이 보여지며, 참조 내역도 확인할 수 있습니다.
        </Text>
      </Stack>
      <SearchApprovals setParams={setParams} />
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        <ApprovalList params={params} />
        <ScrollToTop />
      </Paper>
    </>
  );
};

export default Approval;
