"use client";
import ApprovalList from "@/components/Approval/list";
import SearchApprovals from "@/components/Approval/search";
import PageContainer from "@/components/Global/container";
import { TApproval } from "@/types/apiTypes";
import { Paper, Stack, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Suspense, useState } from "react";
import Loading from "./loading";

const page = () => {
  const [params, setParams] = useState<TApproval>({
    year: dayjs().year().toString(),
  });

  return (
    <PageContainer>
      <Stack gap={1}>
        <Text size="lg" fw={600} component="a">
          결재 및 승인{" "}
          <Text component="span" fz={"sm"} c={"dimmed"} ml={"sm"}>
            {/* {approvalsList?.length}건 */}
          </Text>
        </Text>
        <Text component="span" c={"gray.6"} fz={"sm"}>
          결재 및 승인 요청 내역이 보여지며, 참조 내역도 확인할 수 있습니다.
        </Text>
      </Stack>

      <SearchApprovals setParams={setParams} />
      <Paper bg={"white"} px="md" py="md" radius={"lg"}>
        <Suspense fallback={<Loading />}>
          <ApprovalList params={params} />
        </Suspense>
      </Paper>
    </PageContainer>
  );
};

export default page;
